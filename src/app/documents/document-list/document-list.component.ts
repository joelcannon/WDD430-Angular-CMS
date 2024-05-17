import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  documents: Document[]; // define the documents property

  ngOnInit() {
    console.log('DocumentListComponent initialized');
    let doc1 = new Document(
      1,
      'Document 1',
      'This is document 1',
      'url-to-document-1',
      []
    );
    let doc2 = new Document(
      2,
      'Document 2',
      'This is document 2',
      'url-to-document-2',
      []
    );
    let doc3 = new Document(
      3,
      'Document 3',
      'This is document 3',
      'url-to-document-3',
      []
    );
    let doc4 = new Document(
      4,
      'Document 4',
      'This is document 4',
      'url-to-document-4',
      [doc1, doc2]
    );

    this.documents = [doc1, doc2, doc3, doc4];
    console.log(this.documents);
  }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
