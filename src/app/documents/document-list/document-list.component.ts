import { Component, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  doc1 = new Document(
    1,
    'Document 1',
    'This is document 1',
    'url-to-document-1',
    []
  );
  doc2 = new Document(
    2,
    'Document 2',
    'This is document 2',
    'url-to-document-2',
    []
  );
  doc3 = new Document(
    3,
    'Document 3',
    'This is document 3',
    'url-to-document-3',
    []
  );
  doc4 = new Document(
    4,
    'Document 4',
    'This is document 4',
    'url-to-document-4',
    [this.doc1, this.doc2]
  );

  documents: Document[] = [this.doc1, this.doc2, this.doc3, this.doc4];

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
