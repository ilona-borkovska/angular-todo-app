import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { distinctUntilChanged, filter, from, map, mergeMap, switchMap, tap } from 'rxjs';
import { MessageService } from 'src/app/services/message.service';
import { TodosService } from 'src/app/services/todos.service';
import { Status } from 'src/app/types/status';
import { Todo } from 'src/app/types/todo';

@Component({
  selector: 'app-todos-page',
  templateUrl: './todos-page.component.html',
  styleUrls: ['./todos-page.component.scss']
})
export class TodosPageComponent {
  todos$ = this.todosService.todos$;
  todosCount$ = this.todos$.pipe(
    distinctUntilChanged(),
    map(todos => todos.length),
  );
  activeTodos$ = this.todos$.pipe(
    distinctUntilChanged(),
    map(todos => todos.filter(todo => !todo.completed)),
  );
  completedTodos$ = this.todos$.pipe(
    distinctUntilChanged(),
    map(todos => todos.filter(todo => todo.completed)),
  );
  activeCount$ = this.activeTodos$.pipe(
    distinctUntilChanged(),
    map(todos => todos.length),
  );
  isAllCompleted$ = this.todos$.pipe(
    distinctUntilChanged(),
    map(todos => todos.every(todo => todo.completed)),
  );
  visibleTodos$ = this.route.params.pipe(
    switchMap(params => {
      switch(params['status'] as Status) {
        case Status.ACTIVE:
          return this.activeTodos$;

        case Status.COMPLETED:
          return this.completedTodos$;

        default:
          return this.todos$;
      }
    })
  );

  constructor(
    private todosService: TodosService,
    private messageService: MessageService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.todosService.loadTodos()
      .subscribe({
        error: () => this.messageService.showMessage('Unable to load todos'),
      });
  }

  trackById(i: number, todo: Todo) {
    return todo.id;
  }

  addTodo(title: string) {
    this.todosService.createTodo(title)
      .subscribe({
        error: () => this.messageService.showMessage('Unable to add a todo'),
      });
  }

  toggleTodo(todo: Todo) {
    this.todosService.updateTodo({
      ...todo,
      completed: !todo.completed,
    })
      .subscribe({
        error: () => this.messageService.showMessage('Unable to update a todo'),
      });
  }

  renameTodo(todo: Todo, title: string) {
    this.todosService.updateTodo({ ...todo, title })
      .subscribe({
        error: () => this.messageService.showMessage('Unable to update a todo'),
      });
  }

  deleteTodo(todo: Todo) {
    this.todosService.deleteTodo(todo)
      .subscribe({
        error: () => this.messageService.showMessage('Unable to delete a todo'),
      });
  }
}
