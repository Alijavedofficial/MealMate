import { HttpClient, HttpTransferCacheOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  private foodApi  = '../../assets/foods.json'
  constructor(private http: HttpClient) { }

  getFoods(): Observable<any[]> {
    return this.http.get<any[]>(this.foodApi);
  }
}
