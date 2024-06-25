import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Document } from './document.model';
import { DataStorageService } from '../shared/data-storage.service';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  documents: Document[] = [];
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;

  constructor(private dataStorageService: DataStorageService) {
    this.dataStorageService.documentsChanged.subscribe(
      (documents: Document[]) => {
        this.setDocuments(documents);
        this.maxDocumentId = this.getMaxId();
      }
    );
  }

  setDocuments(documents: Document[]) {
    this.documents = documents;
    this.maxDocumentId = this.getMaxId();
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

  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }
    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    this.dataStorageService.storeDocuments(this.documents);
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const index = this.documents.findIndex((d) => d.id === document.id);
    if (index !== -1) {
      this.documents.splice(index, 1);
      this.dataStorageService.storeDocuments(this.documents);
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
      this.dataStorageService.storeDocuments(this.documents);
    }
  }

  private getMaxId(): number {
    return this.documents.length > 0
      ? Math.max(...this.documents.map((d) => +d.id))
      : 0;
  }
}
