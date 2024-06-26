import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Message } from './message.model';
import { DataStorageService } from '../shared/data-storage.service';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: Message[] = [];
  messageListChangedEvent = new Subject<Message[]>();
  maxMessageId: number;

  constructor(private dataStorageService: DataStorageService) {
    this.dataStorageService.messagesChanged.subscribe((messages: Message[]) => {
      this.setMessages(messages);
      this.maxMessageId = this.getMaxId();
    });
  }

  setMessages(messages: Message[]) {
    this.messages = messages;
    this.maxMessageId = this.getMaxId();
    this.messageListChangedEvent.next(this.messages.slice());
  }

  getMessages(): Message[] {
    return this.messages.slice();
  }

  getMessage(id: string): Message {
    return this.messages.find((message) => message.id === id) || null;
  }

  addMessage(newMessage: Message) {
    if (!newMessage) {
      return;
    }
    this.maxMessageId++;
    newMessage.id = this.maxMessageId.toString();
    this.messages.push(newMessage);
    this.dataStorageService.storeMessages(this.messages);
  }

  deleteMessage(message: Message) {
    if (!message) {
      return;
    }
    const index = this.messages.findIndex((m) => m.id === message.id);
    if (index !== -1) {
      this.messages.splice(index, 1);
      this.dataStorageService.storeMessages(this.messages);
    }
  }

  updateMessage(originalMessage: Message, newMessage: Message) {
    if (!originalMessage || !newMessage) {
      return;
    }
    const pos = this.messages.findIndex((m) => m.id === originalMessage.id);
    if (pos !== -1) {
      newMessage.id = originalMessage.id;
      this.messages[pos] = newMessage;
      this.dataStorageService.storeMessages(this.messages);
    }
  }

  private getMaxId(): number {
    return this.messages.length > 0
      ? Math.max(...this.messages.map((m) => +m.id))
      : 0;
  }
}
