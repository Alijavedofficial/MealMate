import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MealPlanService {

  private apiUrl = 'https://api.spoonacular.com/mealplanner/generate';
  private apiKey = 'eaf4cec80a8947e286db86ceab08afa7';

  constructor(private http: HttpClient) { }

  generateMealPlan(calories: number, targetCalories: number, diet: string, number: number): Observable<any> {
    const params = {
      apiKey: this.apiKey,
      timeFrame: 'day',
      targetCalories: targetCalories,
      diet: diet,
      number: number,
      addRecipeNutrition: true
    };

    return this.http.get<any>(this.apiUrl, { params: params });
  }
 
}
