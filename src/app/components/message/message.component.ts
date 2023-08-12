import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit{
  @Input() title = 'Error';

  message = '';
  hidden = true;
  constructor(
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.messageService.message$
      .subscribe(newMessage => {
        this.hidden = false;
        this.message = newMessage;
      });
  }
}
