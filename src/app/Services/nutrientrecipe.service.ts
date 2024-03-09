import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NutrientrecipeService {

  private readonly API_KEY = 'eaf4cec80a8947e286db86ceab08afa7';
  private readonly API_URL = 'https://api.spoonacular.com/recipes';

  constructor(private http: HttpClient) { }

  searchRecipesByIngredients(ingredients: string[]): Observable<any> {
    const query = ingredients.join(',');
    return this.http.get<any>(`${this.API_URL}/findByIngredients?ingredients=${query}&apiKey=${this.API_KEY}`);
  }
}
