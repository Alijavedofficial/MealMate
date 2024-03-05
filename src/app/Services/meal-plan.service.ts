import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MealPlanService {
  private MealapiUrl = 'https://raw.githubusercontent.com/Alijavedofficial/Meals_Api/main/meals.json'; 
  private SnackapiUrl = '../../assets/Snacks.json'

  constructor(private http: HttpClient) { }

  getMeals(): Observable<any[]> {
    return this.http.get<any[]>(this.MealapiUrl);
  }

  getSnacks(): Observable<any[]> {
    return this.http.get<any[]>(this.SnackapiUrl);
  }

  
}
