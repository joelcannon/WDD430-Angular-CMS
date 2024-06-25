import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Contact } from './contact.model';
import { DataStorageService } from '../shared/data-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contacts: Contact[] = [];
  contactListChangedEvent = new Subject<Contact[]>();
  maxContactId: number;

  constructor(private dataStorageService: DataStorageService) {
    this.dataStorageService.contactsChanged.subscribe((contacts: Contact[]) => {
      this.setContacts(contacts);
      this.maxContactId = this.getMaxId();
    });
  }

  setContacts(contacts: Contact[]) {
    this.contacts = contacts;
    this.maxContactId = this.getMaxId();
    this.contactListChangedEvent.next(this.contacts.slice());
  }

  getContacts() {
    return this.contacts.slice();
  }

  getContact(id: string): Contact {
    return this.contacts.find((contact) => contact.id === id) || null;
  }

  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.dataStorageService.storeContacts(this.contacts);
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const index = this.contacts.findIndex((c) => c.id === contact.id);
    if (index !== -1) {
      this.contacts.splice(index, 1);
      this.dataStorageService.storeContacts(this.contacts);
    }
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }
    const pos = this.contacts.findIndex((c) => c.id === originalContact.id);
    if (pos !== -1) {
      newContact.id = originalContact.id;
      this.contacts[pos] = newContact;
      this.dataStorageService.storeContacts(this.contacts);
    }
  }

  private getMaxId(): number {
    return this.contacts.length > 0
      ? Math.max(...this.contacts.map((c) => +c.id))
      : 0;
  }
}
