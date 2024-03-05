import { Component, OnInit } from '@angular/core';
import { MealPlanService } from '../Services/meal-plan.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { takeUntil } from 'rxjs';
import { Subject } from 'rxjs';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-meal-planner',
  templateUrl: './meal-planner.component.html',
  styleUrl: './meal-planner.component.css',
})
export class MealPlannerComponent implements OnInit,OnDestroy {
  mealform: FormGroup;
  meals: any[] = [];
  snacks: any[] = [];
  filteredMeals: any[] = [];
  filteredSnacks: any[] = [];
  totalCalories: number = 0;
  totalProtein: number = 0;
  totalCarbs: number = 0;
  totalFat: number = 0;
  TotalSugar: number  = 0 ;
  TotalFiber: number = 0;

private unsubscribe$ = new Subject<void>();

  constructor(private mealService: MealPlanService, private fb: FormBuilder) {
    this.mealform = this.fb.group({
      TotalCalories: [,[Validators.required, Validators.min(150)]],
      numberOfMeals: [,[Validators.required, Validators.min(1)]],
      dietaryPreference: ['', Validators.required],
      numberOfSnacks: [,[Validators.required, Validators.max(3)]]
    });
  }

  ngOnInit(): void {
    this.mealService.getMeals().pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
      this.meals = data;
    });
    this.mealService.getSnacks().subscribe((data) => {
      this.snacks = data;
    })
  }

 ngOnDestroy(): void {
  this.unsubscribe$.next();
  this.unsubscribe$.complete();
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
    const numberOfSnacks = this.mealform.get('numberOfSnacks')?.value;
    const dietaryPreference = this.mealform.get('dietaryPreference')?.value;

    if (totalCalories && numberOfMeals && numberOfSnacks) {
        const desiredCaloriesPerMeal = Math.round(totalCalories / numberOfMeals);
        const desiredCaloriesPerSnack = Math.round(totalCalories / numberOfSnacks);

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

        let filteredSnacks = this.snacks;
        if (dietaryPreference) {
            filteredSnacks = this.filterSnacksByDietaryPreference(dietaryPreference);
        }

        const sortedSnacks = filteredSnacks.slice().sort((snack1, snack2) => {
            const diff1 = Math.abs(snack1.calories - desiredCaloriesPerSnack);
            const diff2 = Math.abs(snack2.calories - desiredCaloriesPerSnack);
            return diff1 - diff2;
        });

        let selectedSnacks: any[] = [];
        let totalSelectedSnackCalories = 0;

        for (const snack of sortedSnacks) {
            if (selectedSnacks.length < numberOfSnacks) {
                selectedSnacks.push(snack);
                totalSelectedSnackCalories += snack.calories;
            } else {
                break;
            }
        }

        this.filteredMeals = selectedMeals;
        this.filteredSnacks = selectedSnacks;
        this.calculateTotals();
    }
}

filterMealsByDietaryPreference(preference: string) {
  return this.meals.filter((meal) =>
      meal.dietaryPreference.includes(preference)
  );
}
filterSnacksByDietaryPreference(preference: string) {
  return this.snacks.filter((snack) =>
      snack.dietaryPreference.includes(preference)
  );
}


}
