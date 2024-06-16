import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css',
})
export class ContactEditComponent implements OnInit {
  groupContacts: Contact[] = [];
  contact: Contact = new Contact('', '', '', '', '', []);
  email: string = '';

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    console.log('ContactEditComponent ngOnInit');
  }

  onSubmit(form: NgForm) {
    // Add your logic here to handle form submission
  }

  onCancel() {
    // Add your logic here
  }
}
