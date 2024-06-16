import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router'; // Import Router and ActivatedRoute

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css',
})
export class ContactEditComponent implements OnInit {
  // groupContacts: Contact[] = [];
  originalContact: Contact; // Add this line
  contact: Contact = new Contact('', '', '', '', '', []);
  groupContacts: Contact[] = [];
  editMode: boolean = false; // Add this line
  id: string; // Add this line
  email: string = '';

  constructor(
    private contactService: ContactService,
    private router: Router, // Inject Router
    private route: ActivatedRoute // Inject ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (this.id === undefined || this.id === null) {
        this.editMode = false;
        return;
      }
      this.originalContact = this.contactService.getContact(this.id);
      if (this.originalContact === undefined || this.id === null) {
        return;
      }
      this.editMode = true;
      this.contact = JSON.parse(JSON.stringify(this.originalContact)); // Clone originalContact

      if (
        this.originalContact.groupContacts !== undefined &&
        this.originalContact.groupContacts !== null
      ) {
        this.groupContacts = JSON.parse(
          JSON.stringify(this.originalContact.groupContacts)
        ); // Clone group
      }
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value; // Get the value of the form
    const newContact = new Contact(
      '',
      value.name,
      value.email,
      value.phone,
      value.imageUrl,
      this.groupContacts
    );
    if (this.editMode === true) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }
    this.router.navigate(['/contacts']);
  }

  onCancel() {
    this.router.navigate(['/contacts']);
  }

  drag(event) {
    event.dataTransfer.setData('text', event.target.id);
  }

  allowDrop(event) {
    event.preventDefault();
  }

  drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData('text');
    event.target.appendChild(document.getElementById(data));
  }

  isInvalidContact(newContact: Contact): boolean {
    if (!newContact) {
      // newContact has no value
      return true;
    }
    if (this.contact && newContact.id === this.contact.id) {
      return true; // Cannot add yourself to your own group
    }
    return this.groupContacts.some((contact) => contact.id === newContact.id);
  }
}
