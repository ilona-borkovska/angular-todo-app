import { Component } from '@angular/core';


const todos = [
  { title: 'HTML', completed: true, id: 1, userId: 11 },
  { title: 'CSS', completed: false, id: 2, userId: 11 },
  { title: 'JS', completed: true, id: 3, userId: 11 },
  { title: 'TS', completed: false, id: 4, userId: 11 },
]

interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  editing = false;
  todos = todos;

  handleTodoToggle(event: Event, todo: Todo) {
    todo.completed = (event.target as HTMLInputElement).checked;
  }
}
