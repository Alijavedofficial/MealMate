import { Component } from '@angular/core';
import { MealPlanService } from '../Services/meal-plan.service';

@Component({
  selector: 'app-meal-planner',
  templateUrl: './meal-planner.component.html',
  styleUrl: './meal-planner.component.css'
})
export class MealPlannerComponent {
  calories: number = 0;
  targetCalories: number = 0
  diet: string = '';
  mealPlan: any[] = [];

  constructor(private mealPlanService: MealPlanService) { }

  generateMealPlan() {
    this.mealPlanService.generateMealPlan(this.calories, this.targetCalories, this.diet, 3)
      .subscribe(response => {
        this.mealPlan = response.meals;
      }, error => {
        console.error('Error generating meal plan:', error);
      });
  }
}
