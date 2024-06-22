import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Document } from './document.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  documents: Document[] = [];
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;

  constructor(private http: HttpClient) {}

  getDocumentsObservable(): Observable<Document[]> {
    return this.http
      .get<Document[]>(`${environment.firebaseUrl}/documents.json`)
      .pipe(
        map((documents: Document[]) => {
          // Optional: Include any transformations or additional logic here before returning
          this.maxDocumentId = this.getMaxId(documents);
          console.log('maxDocumentId', this.maxDocumentId);
          return documents.sort((a, b) => a.name.localeCompare(b.name));
        })
      );
  }

  getDocument(id: string): Document {
    return this.documents.find((document) => document.id === id) || null;
  }

  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }

    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    this.documentListChangedEvent.next(this.documents.slice());
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    this.documentListChangedEvent.next(this.documents.slice());
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    this.documentListChangedEvent.next(this.documents.slice());
  }

  getMaxId(documents: Document[]): number {
    return documents.reduce(
      (maxId, document) => Math.max(maxId, parseInt(document.id, 10)),
      0
    );
  }
}
