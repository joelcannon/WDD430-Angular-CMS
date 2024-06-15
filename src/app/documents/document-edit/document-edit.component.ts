import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.css',
})
export class DocumentEditComponent implements OnInit {
  originalDocument: Document;
  document: Document;
  editMode: boolean = false;

  ngOnInit(): void {
    this.document = new Document('', '', '', '', []);
  }

  onSubmit(form: NgForm) {
    // Handle form submission
    console.log(form.value);
  }

  onCancel() {
    // Add your logic here
  }
}
