import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { DataStorageService } from '../../shared/data-storage.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageListComponent implements OnInit {
  messages$: Observable<Message[]>;

  constructor(
    private messageService: MessageService,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit(): void {
    this.messages$ = this.dataStorageService.fetchMessages();
  }

  onAddMessage(message: Message) {
    this.messageService.addMessage(message);
  }
}
