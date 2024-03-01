import { Component, OnInit } from '@angular/core';
import { MealPlanService } from '../Services/meal-plan.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-meal-planner',
  templateUrl: './meal-planner.component.html',
  styleUrl: './meal-planner.component.css',
})
export class MealPlannerComponent implements OnInit {
  mealform: FormGroup;
  meals: any[] = [];
  filteredMeals: any[] = [];

  constructor(private mealService: MealPlanService, private fb: FormBuilder) {
    this.mealform = this.fb.group({
      TotalCalories: [0,[Validators.required, Validators.min(300)]],
      numberOfMeals: [0,[Validators.required, Validators.min(1)]],
      dietaryPreference: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.mealService.getMeals().subscribe((data) => {
      this.meals = data;
    });
  }

  generateMealPlan() {
    const totalCalories = this.mealform.get('TotalCalories')?.value;
    const numberOfMeals = this.mealform.get('numberOfMeals')?.value;
    const dietaryPreference = this.mealform.get('dietaryPreference')?.value;

    if (totalCalories && numberOfMeals) {
      const desiredCaloriesPerMeal = Math.round(totalCalories / numberOfMeals);

      let filteredMeals = this.meals;
      if (dietaryPreference) {
        filteredMeals = this.filterMealsByDietaryPreference(dietaryPreference);
      }

      const sortedMeals = filteredMeals.slice().sort((meal1, meal2) => {
        const diff1 = Math.abs(meal1.calories - desiredCaloriesPerMeal);
        const diff2 = Math.abs(meal2.calories - desiredCaloriesPerMeal);
        return diff1 - diff2;
      });

      let selectedMeals: any[] = [];
      let totalSelectedCalories = 0;

      for (const meal of sortedMeals) {
        if (selectedMeals.length < numberOfMeals) {
          selectedMeals.push(meal);
          totalSelectedCalories += meal.calories;
        } else {
          break;
        }
      }

      this.filteredMeals = selectedMeals;
    }
  }

  filterMealsByDietaryPreference(preference: string) {
    return this.meals.filter((meal) =>
      meal.dietaryPreference.includes(preference)
    );
  }
}
