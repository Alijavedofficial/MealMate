import { Component } from '@angular/core';
import { NutrientrecipeService } from '../Services/nutrientrecipe.service';

@Component({
  selector: 'app-nutrientrecipe',
  templateUrl: './nutrientrecipe.component.html',
  styleUrl: './nutrientrecipe.component.css'
})
export class NutrientrecipeComponent {


  ingredientsInput: string = '';
  suggestedRecipes: any[] = [];
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private recipeService: NutrientrecipeService) { }
  analyzeNutrition(): void {
    if (this.ingredientsInput.trim() === '') {
      this.errorMessage = 'Please enter some ingredients';
      return;
    }

    const ingredientsArray = this.ingredientsInput.split(',').map(ingredient => ingredient.trim());

    this.recipeService.searchRecipesByIngredients(ingredientsArray).subscribe(
      (response: any[]) => {
        console.log(response)
        if (response.length > 0) {
          this.suggestedRecipes = response.map((recipe: any) => ({
            ...recipe,
            readyInMinutes: recipe.readyInMinutes || 'N/A',
            servings: recipe.servings || 'N/A'
          }));
          this.errorMessage = '';
        } else {
          this.errorMessage = 'No recipes found for the provided ingredients';
        }
      },
      (error: any) => {
        console.error('Error fetching recipes by ingredients:', error);
        this.errorMessage = 'Error fetching recipes';
      }
    );
  }

  showLoader() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }
}
