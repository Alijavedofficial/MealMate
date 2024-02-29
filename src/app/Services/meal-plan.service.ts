import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MealPlanService {
  private apiUrl = '../../assets/meals.json'; 

  constructor(private http: HttpClient) { }

  getMeals(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  filterMealsByCalories(meals: any[], maxCalories: number): any[] {
    return meals.filter(meal => meal.calories <= maxCalories);
  }
}
