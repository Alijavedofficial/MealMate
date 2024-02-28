import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MealPlanService {

  private apiUrl = 'https://api.spoonacular.com/mealplanner/generate';
  private apiKey = 'eaf4cec80a8947e286db86ceab08afa7'

  constructor(private http: HttpClient) { }

  generateMealPlan(calories: number, numberOfMeals: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const queryParams = `?apiKey=${this.apiKey}&timeFrame=day&number=${numberOfMeals}`;

    return this.http.get<any>(`${this.apiUrl}${queryParams}`, httpOptions);
  }
}
