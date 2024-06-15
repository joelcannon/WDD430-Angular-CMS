import { Component, OnInit } from '@angular/core';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css',
})
export class ContactEditComponent implements OnInit {
  groupContacts: Contact[] = [];

  constructor() {}

  ngOnInit(): void {}

  onCancel() {
    // Add your logic here
  }
}
