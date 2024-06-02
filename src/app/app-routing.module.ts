import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocumentsComponent } from './documents/documents.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { ContactsComponent } from './contacts/contacts.component';

const routes: Routes = [
  { path: 'documents', component: DocumentsComponent },
  { path: 'messages', component: MessageListComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: '', redirectTo: '/documents', pathMatch: 'full' }, // default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
