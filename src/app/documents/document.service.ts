import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Document } from './document.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  documents: Document[] = [];
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;

  constructor(private http: HttpClient) {}

  setDocuments(documents: Document[]) {
    this.documents = documents;
    this.documentListChangedEvent.next(this.documents.slice());
  }

  getDocuments() {
    return this.documents.slice();
  }

  getDocument(id: string): Document {
    console.log(
      'getDocument called with id: ' +
        id +
        ' and documents: ' +
        this.documents +
        ' and maxDocumentId: ' +
        this.maxDocumentId
    );
    return this.documents.find((document) => document.id === id) || null;
  }

  fetchDocuments(): Observable<Document[]> {
    return this.http
      .get<Document[]>(`${environment.firebaseUrl}/documents.json`)
      .pipe(
        map((documents: Document[]) => {
          // Optional: Include any transformations or additional logic here before returning
          this.maxDocumentId = this.getMaxId(documents);
          return documents.sort((a, b) => a.name.localeCompare(b.name));
        }),
        tap((fetchedDocuments) => {
          this.setDocuments(fetchedDocuments);
        })
      );
  }

  storeDocuments() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .put(
        `${environment.firebaseUrl}/documents.json`,
        JSON.stringify(this.documents),
        { headers: headers }
      )
      .subscribe(() => {
        this.documentListChangedEvent.next(this.documents.slice());
      });
  }

  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }
    // Assuming getMaxId and other utility methods are defined elsewhere in the service
    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    this.storeDocuments();
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const index = this.documents.findIndex((d) => d.id === document.id);
    if (index !== -1) {
      this.documents.splice(index, 1);
      this.storeDocuments();
    }
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }
    const pos = this.documents.findIndex((d) => d.id === originalDocument.id);
    if (pos !== -1) {
      newDocument.id = originalDocument.id;
      this.documents[pos] = newDocument;
      this.storeDocuments();
    }
  }

  // Ensure getMaxId and any other utility methods are correctly implemented
  private getMaxId(documents: Document[]): number {
    // Implementation for getMaxId
    return Math.max(...documents.map((d) => Number(d.id)), 0);
  }
}
