import { Injectable } from '@angular/core';
import { Contact } from './contact';
import { MOCKCONTACTS } from './MOCKCONTACTS'; // Import the MOCKCONTACTS array

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contacts: Contact[] = [];

  constructor() {
    this.contacts = MOCKCONTACTS;
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact {
    return this.contacts.find((contact) => contact.id === id) || null;
  }
}
