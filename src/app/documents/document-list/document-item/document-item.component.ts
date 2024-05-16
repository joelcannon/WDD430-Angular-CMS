import { Component, Input } from '@angular/core';
import { Document } from '../../document.model'; // replace with the actual path to the Document model

@Component({
  selector: 'app-document-item',
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css'],
})
export class DocumentItemComponent {
  @Input() document: Document;
}
