import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { DocumentService } from '../document.service';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush, // Change detection strategy set to OnPush
})
export class DocumentListComponent implements OnInit, OnDestroy {
  documents$: Observable<Document[]>; // Use an Observable directly
  private documentsSubscription: Subscription;

  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    console.log('DocumentListComponent ngOnInit');
    this.documents$ = this.documentService.getDocumentsObservable(); // Assuming this method is implemented to return an Observable
    this.documentsSubscription =
      this.documentService.documentListChangedEvent.subscribe({
        next: (documents: Document[]) => {
          // Handle document update logic if necessary
        },
        error: (error) => {
          // Handle error
          console.error('Error fetching documents:', error);
        },
      });
  }

  ngOnDestroy() {
    this.documentsSubscription.unsubscribe();
  }
}
