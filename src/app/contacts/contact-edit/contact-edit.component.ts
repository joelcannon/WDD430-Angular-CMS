import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router'; // Import Router and ActivatedRoute
import {
  CdkDragDrop,
  moveItemInArray,
  CdkDropList,
} from '@angular/cdk/drag-drop';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css',
})
export class ContactEditComponent implements OnInit {
  @ViewChild('contactList') contactList: CdkDropList;

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
    console.log('drag');
    event.dataTransfer.setData('text', event.target.id);
  }

  allowDrop(event) {
    console.log('allowDrop');
    event.preventDefault();
  }

  // drop(event) {
  //   event.preventDefault();
  //   var data = event.dataTransfer.getData('text');
  //   event.target.appendChild(document.getElementById(data));
  // }
  drop(event: CdkDragDrop<string[]>) {
    console.log('drop');
    moveItemInArray(
      this.groupContacts,
      event.previousIndex,
      event.currentIndex
    );
  }

  isInvalidContact(newContact: Contact): boolean {
    console.log('isInvalidContact');
    if (!newContact) {
      // newContact has no value
      return true;
    }
    if (this.contact && newContact.id === this.contact.id) {
      return true; // Cannot add yourself to your own group
    }
    return this.groupContacts.some((contact) => contact.id === newContact.id);
  }

  addToGroup($event: any) {
    const selectedContact: Contact = $event.dragData;
    const invalidGroupContact = this.isInvalidContact(selectedContact);
    if (invalidGroupContact) {
      return;
    }
    this.groupContacts.push(selectedContact);
    console.log('addToGroup');
  }

  onRemoveItem(index: number) {
    if (index < 0 || index >= this.groupContacts.length) {
      return;
    }
    this.groupContacts.splice(index, 1);
    console.log('onRemoveItem');
  }
}
