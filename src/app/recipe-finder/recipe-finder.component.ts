import { Component } from '@angular/core';
import { RecipefinderService } from '../Services/recipefinder.service';

@Component({
  selector: 'app-recipe-finder',
  templateUrl: './recipe-finder.component.html',
  styleUrl: './recipe-finder.component.css'
})
export class RecipeFinderComponent {

  dishName: string = '';
  recipe: any;
  relatedRecipes: any[] = [];
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private recipeService: RecipefinderService) {}

  searchRecipe(): void {
    if (this.dishName.trim() === '') {
      this.errorMessage = 'Please enter a dish name';
      return;
    }

    this.recipeService.getRecipeByName(this.dishName).subscribe(
      (response: any) => {
        if (response.results.length > 0) {
          
          const recipeId = response.results[0].id;
          this.recipeService.getRecipeById(recipeId).subscribe(
            (recipeResponse: any) => {
              this.recipe = recipeResponse;
              this.errorMessage = '';

              
              this.recipeService.getRelatedRecipes(recipeId).subscribe(
                (relatedResponse: any) => {
                  this.relatedRecipes = relatedResponse;
                },
                (relatedError: any) => {
                  console.error('Error fetching related recipes:', relatedError);
                }
              );
            },
            (error: any) => {
              console.error('Error fetching recipe by ID:', error);
              this.errorMessage = 'Error fetching recipe details';
            }
          );
        } else {
          this.errorMessage = 'No recipes found';
        }
      },
      (error: any) => {
        console.error('Error fetching recipe by name:', error);
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
