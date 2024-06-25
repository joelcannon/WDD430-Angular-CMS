import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { DataStorageService } from '../../shared/data-storage.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactListComponent implements OnInit {
  contacts$: Observable<Contact[]>; // Use an Observable directly for contacts
  term: string;

  constructor(
    private contactService: ContactService,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit(): void {
    this.contacts$ = this.dataStorageService.fetchContacts();
  }

  search(value: string) {
    this.term = value;
  }
}
