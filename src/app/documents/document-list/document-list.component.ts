import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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

  constructor(
    private documentService: DocumentService,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit(): void {
    this.documents$ = this.dataStorageService.fetchDocuments();
  }

  trackByDocuments(index: number, document: Document): string {
    return document.id;
  }
}
