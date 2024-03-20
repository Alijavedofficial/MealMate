import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  private apiKey = 'ab6a22a31eea48808ec7688ec9782278';

  constructor(private http: HttpClient) { }

  getDietArticles(): Observable<any> {
    const apiUrl = `https://newsapi.org/v2/everything?q=diet&apiKey=${this.apiKey}`;
    
    return this.http.get(apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching articles:', error);
        return throwError('Error fetching articles. Please try again later.');
      })
    );
  }
}
