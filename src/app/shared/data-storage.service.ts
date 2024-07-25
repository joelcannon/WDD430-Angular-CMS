import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Document } from '../documents/document.model';
import { Contact } from '../contacts/contact.model'; // Ensure you have a Contact model
import { Message } from '../messages/message.model'; // Import the Message model

import { Observable, throwError, Subject } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  documentsChanged = new Subject<Document[]>(); // Step 2: Use Subject
  contactsChanged = new Subject<Contact[]>(); // Add a new Subject for contacts
  messagesChanged = new Subject<Message[]>(); // Add a new Subject for messages

  constructor(private http: HttpClient) {}

  storeDocuments(documents: Document[]) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .put(`${environment.apiUrl}/documents`, JSON.stringify(documents), {
        headers: headers,
      })
      .subscribe(() => {
        this.documentsChanged.next(documents);
      });
  }

  fetchDocuments(): Observable<Document[]> {
    return this.http
      .get<{
        message: string;
        data: Document[];
      }>(`${environment.apiUrl}/documents`)
      .pipe(
        map((response) =>
          response.data.sort((a, b) => a.name.localeCompare(b.name))
        ),
        tap((fetchedDocuments) => {
          this.documentsChanged.next(fetchedDocuments);
        }),
        catchError((error) => {
          console.error('Error fetching documents:', error);
          return throwError(() => new Error('Error fetching documents'));
        })
      );
  }

  storeContacts(contacts: Contact[]) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .put(`${environment.apiUrl}/contacts`, JSON.stringify(contacts), {
        headers: headers,
      })
      .subscribe(() => {
        this.contactsChanged.next(contacts);
      });
  }

  addContact(newContact: Contact) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post(
      `${environment.apiUrl}/contacts`,
      JSON.stringify(newContact),
      {
        headers: headers,
      }
    );
  }

  // DELETE a contact by ID with error handling
  deleteContact(contactId: string) {
    return this.http.delete(`${environment.apiUrl}/contacts/${contactId}`).pipe(
      catchError((error) => {
        // Handle the error or log it
        console.error('Error occurred while deleting contact:', error);
        // Rethrow or handle it differently
        return throwError(() => new Error('Failed to delete contact'));
      })
    );
  }

  // UPDATE a contact with error handling
  updateContact(contactId: string, updatedContact: Contact) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .put(
        `${environment.apiUrl}/contacts/${contactId}`,
        JSON.stringify(updatedContact),
        {
          headers: headers,
        }
      )
      .pipe(
        catchError((error) => {
          // Handle the error or log it
          console.error('Error occurred while updating contact:', error);
          // Rethrow or handle it differently
          return throwError(() => new Error('Failed to update contact'));
        })
      );
  }

  fetchContactsJWC(): Observable<Contact[]> {
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

  storeMessages(messages: Message[]) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .put(`${environment.apiUrl}/messages`, JSON.stringify(messages), {
        headers: headers,
      })
      .subscribe(() => {
        this.messagesChanged.next(messages);
      });
  }

  fetchMessages(): Observable<Message[]> {
    return this.http
      .get<{
        message: string;
        data: Message[];
      }>(`${environment.apiUrl}/messages`)
      .pipe(
        map((response) => response.data),
        tap((fetchedMessages) => {
          this.messagesChanged.next(fetchedMessages);
        }),
        catchError((error) => {
          console.error('Error fetching messages:', error);
          return throwError(() => new Error('Error fetching messages'));
        })
      );
  }
}
