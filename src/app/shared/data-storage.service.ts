import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Document } from '../documents/document.model';
import { Observable, throwError, Subject } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  documentsChanged = new Subject<Document[]>(); // Step 2: Use Subject

  constructor(private http: HttpClient) {}

  storeDocuments(documents: Document[]) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .put(
        `${environment.firebaseUrl}/documents.json`,
        JSON.stringify(documents),
        { headers: headers }
      )
      .subscribe(() => {
        this.documentsChanged.next(documents);
      });
  }

  fetchDocuments(): Observable<Document[]> {
    return this.http
      .get<Document[]>(`${environment.firebaseUrl}/documents.json`)
      .pipe(
        map((documents) =>
          documents.sort((a, b) => a.name.localeCompare(b.name))
        ),
        tap((fetchedDocuments) => {
          this.documentsChanged.next(fetchedDocuments);
        }),
        catchError((error) => {
          console.error('Error fetching documents:', error);
          return throwError(() => new Error('Error fetching documents'));
        })
      );
  }
}
