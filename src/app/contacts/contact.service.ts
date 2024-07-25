import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { Contact } from './contact.model';
// import { DataStorageService } from '../shared/data-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contacts: Contact[] = [];
  contactListChangedEvent = new Subject<Contact[]>();
  contactsChanged = new Subject<Contact[]>(); // Add a new Subject for contacts
  // messagesChanged = new Subject<Message[]>(); // Add a new Subject for messages JWC

  constructor(private http: HttpClient) {
    this.contactsChanged.subscribe((contacts: Contact[]) => {
      this.setContacts(contacts);
    });
  }

  // constructor(private dataStorageService: DataStorageService) {
  //   this.dataStorageService.contactsChanged.subscribe((contacts: Contact[]) => {
  //     this.setContacts(contacts);
  //   });
  // }

  setContacts(contacts: Contact[]) {
    this.contacts = contacts;
    this.contactListChangedEvent.next(this.contacts.slice());
  }

  getContacts() {
    return this.contacts.slice();
  }

  getContact(id: string): Contact {
    return this.contacts.find((contact) => contact._id === id) || null;
  }

  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }
    newContact._id = null;
    this.contacts.push(newContact);
    // this.dataStorageService.storeContacts(this.contacts);  JWC
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    // Call the deleteContact method from dataStorageService
    this.http
      .delete(`${environment.apiUrl}/contacts/${contact._id}`)
      .subscribe({
        // this.dataStorageService.deleteContact(contact._id).subscribe({
        next: (response) => {
          // Handle successful deletion, e.g., updating the local contacts list or UI feedback
          this.contacts = this.contacts.filter((c) => c._id !== contact._id);

          console.log('Contact deleted successfully', response);
          // Optionally, refresh the local contacts list from the server
        },
        error: (error) => {
          // Handle error
          console.error('Error deleting contact', error);
        },
      });
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }
    const pos = this.contacts.findIndex((c) => c._id === originalContact._id);
    if (pos !== -1) {
      newContact._id = originalContact._id;
      // this.dataStorageService.updateContact(newContact._id, newContact);  JWC
      this.contacts[pos] = newContact;
    }
  }

  fetchContacts(): Observable<Contact[]> {
    return this.http
      .get<{
        message: string;
        data: Contact[];
      }>(`${environment.apiUrl}/contacts`)
      .pipe(
        map((response) =>
          response.data.sort((a, b) => a.name.localeCompare(b.name))
        ),
        tap((fetchedContacts) => {
          this.contactsChanged.next(fetchedContacts);
        }),
        catchError((error) => {
          console.error('Error fetching contacts:', error);
          return throwError(() => new Error('Error fetching contacts'));
        })
      );
  }
}
