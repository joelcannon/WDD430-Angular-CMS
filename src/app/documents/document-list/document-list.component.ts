import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { DocumentService } from '../document.service';
import { DataStorageService } from '../../shared/data-storage.service';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentListComponent implements OnInit {
  documents$: Observable<Document[]>; // Use an Observable directly
  // private documentsSubscription: Subscription;

  constructor(
    private documentService: DocumentService,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit(): void {
    this.documents$ = this.dataStorageService.fetchDocuments();
    // this.documentsSubscription =
    //   this.documentService.documentListChangedEvent.subscribe({
    //     next: (documents: Document[]) => {
    //       // Handle document update logic if necessary
    //       // this.documentService.documents = documents;
    //     },
    //     error: (error) => {
    //       // Handle error
    //       console.error('Error fetching documents:', error);
    //     },
    //   });
  }

  // ngOnDestroy() {
  //   this.documentsSubscription.unsubscribe();
  // }

  trackByDocuments(index: number, document: Document): string {
    return document.id;
  }
}
