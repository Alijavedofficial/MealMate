import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  private apiKey = '85a7ec71c9msh2ed12097307b2e6p1efa68jsna4f453e9cc06';
  private apiUrl = 'https://google-news13.p.rapidapi.com/v1/search';

  constructor(private http: HttpClient) { }

  getArticles(query: string) {
    return this.http.get(this.apiUrl, {
      params: {
        q: query,
        lang: 'en',
        country: 'us'
      },
      headers: {
        'x-rapidapi-key': this.apiKey,
        'x-rapidapi-host': 'google-news13.p.rapidapi.com'
      }
    });
 }

 
}
