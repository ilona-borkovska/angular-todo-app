import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent {
  @Output() save = new EventEmitter<string>();

  todoForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3),
      ]
    }),
  });

  get title() {
    return this.todoForm.get('title') as FormControl;
  }
  constructor(
    private messageService: MessageService,
  ) {}

  handleFormSubmit() {
    if (this.todoForm.invalid) {
      this.messageService.showMessage('The title must be at least 3 letters')
      return;
    }

    this.save.emit(this.title.value);
    this.todoForm.reset();
  }
}
