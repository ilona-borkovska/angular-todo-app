import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../types/todo';
import { BehaviorSubject, Observable, switchMap, tap, withLatestFrom } from 'rxjs';

const API_URL = 'https://mate.academy/students-api';
const USER_ID = '11144';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  private todos$$ = new BehaviorSubject<Todo[]>([]);

  todos$ = this.todos$$.asObservable();

  constructor(
    private http: HttpClient,
  ) {}

  loadTodos() {
    return this.http.get<Todo[]>(`${API_URL}/todos?userId=${USER_ID}`)
      .pipe(
        tap(todos => {
          this.todos$$.next(todos);
        })
      );
  }

  createTodo(title: string) {
    return this.http.post<Todo>(`${API_URL}/todos`, {
      title,
      userId: USER_ID,
      completed: false,
    })
      .pipe(
        withLatestFrom(this.todos$$),
        tap(([createdTodo, todos]) => {
          this.todos$$.next([...todos, createdTodo]);
        })
      );
  }

  updateTodo(todo: Todo) {
    return this.http.patch<Todo>(`${API_URL}/todos/${todo.id}`, todo)
      .pipe(
        withLatestFrom(this.todos$$),
        tap(([createdTodo, todos]) => {
          this.todos$$.next(todos.map(todo => todo.id === createdTodo.id ? createdTodo : todo))
        })
      );
  }

  deleteTodo({ id }: Todo) {
    return this.http.delete(`${API_URL}/todos/${id}`)
      .pipe(
        withLatestFrom(this.todos$$),
        tap(([_, todos]) => {
          this.todos$$.next(todos.filter(todo => todo.id !== id))
        })
      );
  }
}
