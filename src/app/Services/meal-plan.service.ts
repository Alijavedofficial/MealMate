import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MealPlanService {
  private BreakfastapiUrl = '../../assets/Breakfast.json'; 
  private LunchapiUrl = '../../assets/Lunch.json'; 
  private DinnerapiUrl = '../../assets/Dinner.json'; 

  private SnackapiUrl = '../../assets/Snacks.json'

  constructor(private http: HttpClient) { }

  getBreakfast(): Observable<any[]> {
    return this.http.get<any[]>(this.BreakfastapiUrl);
  }
  getLunch(): Observable<any[]> {
    return this.http.get<any[]>(this.LunchapiUrl);
  }
  getDinner(): Observable<any[]> {
    return this.http.get<any[]>(this.DinnerapiUrl);
  }

  getSnacks(): Observable<any[]> {
    return this.http.get<any[]>(this.SnackapiUrl);
  }

  
}
