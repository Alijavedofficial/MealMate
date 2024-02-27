import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  private apiKey = 'ab6a22a31eea48808ec7688ec9782278';
  private apiUrl = 'https://newsapi.org/v2/everything?q=diet&apiKey=' + this.apiKey;

  getDietArticles(): Observable<any> {
    return this.http.get(this.apiUrl)
  }
}
