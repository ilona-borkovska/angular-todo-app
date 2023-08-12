import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoComponent } from './components/todo/todo.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { MessageComponent } from './components/message/message.component';
import { FilterComponent } from './components/filter/filter.component';
import { TodosPageComponent } from './pages/todos-page/todos-page.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'todos', component: TodosPageComponent },
  { path: 'todos/:status', component: TodosPageComponent },
  { path: '**', redirectTo: '/todos/all', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TodoFormComponent,
    MessageComponent,
    FilterComponent,
    TodosPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
