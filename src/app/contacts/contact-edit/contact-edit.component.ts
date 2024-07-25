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
  group: Contact[] = [];
  editMode: boolean = false; // Add this line
  _id: string; // Add this line
  email: string = '';

  constructor(
    private contactService: ContactService,
    private router: Router, // Inject Router
    private route: ActivatedRoute // Inject ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this._id = params['_id'];
      if (this._id === undefined || this._id === null) {
        this.editMode = false;
        return;
      }
      this.originalContact = this.contactService.getContact(this._id);
      if (this.originalContact === undefined || this._id === null) {
        return;
      }
      this.editMode = true;
      this.contact = JSON.parse(JSON.stringify(this.originalContact)); // Clone originalContact

      if (
        this.originalContact.group !== undefined &&
        this.originalContact.group !== null
      ) {
        this.group = JSON.parse(JSON.stringify(this.originalContact.group)); // Clone group
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
      this.group
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
    event.dataTransfer.setData('text', event.target._id);
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
    moveItemInArray(this.group, event.previousIndex, event.currentIndex);
  }

  isInvalidContact(newContact: Contact): boolean {
    console.log('isInvalidContact');
    if (!newContact) {
      // newContact has no value
      return true;
    }
    if (this.contact && newContact._id === this.contact._id) {
      return true; // Cannot add yourself to your own group
    }
    return this.group.some((contact) => contact._id === newContact._id);
  }

  addToGroup($event: any) {
    const selectedContact: Contact = $event.dragData;
    const invalidGroupContact = this.isInvalidContact(selectedContact);
    if (invalidGroupContact) {
      return;
    }
    this.group.push(selectedContact);
    console.log('addToGroup');
  }

  onRemoveItem(index: number) {
    if (index < 0 || index >= this.group.length) {
      return;
    }
    this.group.splice(index, 1);
    console.log('onRemoveItem');
  }
}
