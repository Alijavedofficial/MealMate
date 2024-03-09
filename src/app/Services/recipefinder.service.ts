import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipefinderService {

  constructor(private http:HttpClient) { }

  private readonly API_KEY = 'eaf4cec80a8947e286db86ceab08afa7';
  private readonly API_URL = 'https://api.spoonacular.com/recipes';

  getRecipeByName(dishName: string): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/search?query=${dishName}&apiKey=${this.API_KEY}`);
  }

  getRecipeById(recipeId: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/${recipeId}/information?apiKey=${this.API_KEY}`);
  }

  getRelatedRecipes(recipeId: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/${recipeId}/similar?apiKey=${this.API_KEY}`);
  }
}
