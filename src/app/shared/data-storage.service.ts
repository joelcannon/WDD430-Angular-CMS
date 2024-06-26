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
      .put(
        `${environment.firebaseUrl}/documents.json`,
        JSON.stringify(documents),
        { headers: headers }
      )
      .subscribe(() => {
        this.documentsChanged.next(documents);
      });
  }

  fetchDocuments(): Observable<Document[]> {
    return this.http
      .get<Document[]>(`${environment.firebaseUrl}/documents.json`)
      .pipe(
        map((documents) =>
          documents.sort((a, b) => a.name.localeCompare(b.name))
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
      .put(
        `${environment.firebaseUrl}/contacts.json`,
        JSON.stringify(contacts),
        { headers: headers }
      )
      .subscribe(() => {
        this.contactsChanged.next(contacts);
      });
  }

  fetchContacts(): Observable<Contact[]> {
    return this.http
      .get<Contact[]>(`${environment.firebaseUrl}/contacts.json`)
      .pipe(
        map((contacts) =>
          contacts.sort((a, b) => a.name.localeCompare(b.name))
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
      .put(
        `${environment.firebaseUrl}/messages.json`,
        JSON.stringify(messages),
        { headers: headers }
      )
      .subscribe(() => {
        this.messagesChanged.next(messages);
      });
  }

  fetchMessages(): Observable<Message[]> {
    return this.http
      .get<Message[]>(`${environment.firebaseUrl}/messages.json`)
      .pipe(
        map((messages) => {
          return messages ? messages : [];
        }),
        tap((messages) => {
          this.messagesChanged.next(messages);
        }),
        catchError((error) => {
          // Handle errors appropriately
          return throwError(error);
        })
      );
  }
}
