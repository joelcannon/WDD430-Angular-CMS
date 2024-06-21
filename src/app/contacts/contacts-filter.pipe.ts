import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model'; // replace with the actual path to your Contact model

@Pipe({
  name: 'contactsFilter',
})
export class ContactsFilterPipe implements PipeTransform {
  transform(contacts: Contact[], term: string): Contact[] {
    if (!term) {
      return contacts;
    }

    const filteredContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(term.toLowerCase())
    );

    return filteredContacts.length > 0 ? filteredContacts : contacts;
  }
}
