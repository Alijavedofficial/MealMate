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
  totalCalories: number = 0;
  totalProtein: number = 0;
  totalCarbs: number = 0;
  totalFat: number = 0;
  TotalSugar: number  = 0 ;
  TotalFiber: number = 0;
  constructor(private mealService: MealPlanService, private fb: FormBuilder) {
    this.mealform = this.fb.group({
      TotalCalories: [,[Validators.required, Validators.min(300)]],
      numberOfMeals: [,[Validators.required, Validators.min(1)]],
      dietaryPreference: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.mealService.getMeals().subscribe((data) => {
      this.meals = data;
    });
  }

  calculateTotals() {
    this.totalCalories = 0;
    this.totalProtein = 0;
    this.TotalFiber = 0;
    this.TotalSugar = 0;
    this.totalCarbs = 0;
    this.totalFat = 0;
    
  
    for (const meal of this.filteredMeals) {
      this.totalCalories += meal.calories;
      this.totalProtein += meal.protein;
      this.TotalFiber += meal.fiber;
      this.TotalSugar += meal.sugar;
      this.totalFat += meal.fat;
      this.totalCarbs += meal.carbs;
    }
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
      this.calculateTotals()
    }
  }

  filterMealsByDietaryPreference(preference: string) {
    return this.meals.filter((meal) =>
      meal.dietaryPreference.includes(preference)
    );
  }
}
