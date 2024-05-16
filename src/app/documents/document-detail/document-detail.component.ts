import { Component, Input } from '@angular/core';
import { Document } from '../document.model'; // replace with the actual path to the Document model

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css'],
})
export class DocumentDetailComponent {
  @Input() document: Document;
}
