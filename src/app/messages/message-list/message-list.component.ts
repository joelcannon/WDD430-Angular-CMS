import { Component } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css',
})
export class MessageListComponent {
  messages: Message[] = [
    new Message(1, 'First Message', 'This is the first message', 'John Doe'),
    new Message(2, 'Second Message', 'This is the second message', 'Jane Doe'),
    new Message(3, 'Third Message', 'This is the third message', 'Jim Doe'),
  ];
  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
