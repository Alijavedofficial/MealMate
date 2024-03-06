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
  meallabel: string = '';
private unsubscribe$ = new Subject<void>();

  constructor(private mealService: MealPlanService, private fb: FormBuilder) {
    this.mealform = this.fb.group({
      TotalCalories: [,[Validators.required, Validators.min(1200)]],
      numberOfMeals: [,[Validators.required, Validators.min(1), Validators.max(5)]],
      dietaryPreference: ['', Validators.required],
      numberOfSnacks: [,[Validators.required, Validators.max(2)]],
      Region: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.mealService.getMeals().pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
      this.meals = data;
    });
    this.mealService.getSnacks().pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
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

    for(const snack of this.filteredSnacks){
      this.totalCalories += snack.calories;
      this.totalProtein += snack.protein;
      this.TotalFiber += snack.fiber;
      this.TotalSugar += snack.sugar;
      this.totalFat += snack.fat;
      this.totalCarbs += snack.carbs;
    }
  }

  generateMealPlan() {
    const totalCalories = this.mealform.get('TotalCalories')?.value;
    const numberOfMeals = this.mealform.get('numberOfMeals')?.value;
    const numberOfSnacks = this.mealform.get('numberOfSnacks')?.value;
    const dietaryPreference = this.mealform.get('dietaryPreference')?.value;

    const mealCalories = totalCalories * 1;
    const snackCalories = totalCalories * 0.20;

    if (totalCalories && numberOfMeals) {
      const desiredCaloriesPerMeal = Math.round(mealCalories / numberOfMeals);
      const desiredCaloriesPerSnack = Math.round(snackCalories / numberOfSnacks);

      let filteredMeals = this.meals;
      if (dietaryPreference) {
        filteredMeals = this.filterMealsByDietaryPreference(dietaryPreference);
      }

      let filteredSnacks = this.snacks;
      

      const sortedMeals = filteredMeals.slice().sort((meal1, meal2) => {
        const diff1 = Math.abs(meal1.calories - desiredCaloriesPerMeal);
        const diff2 = Math.abs(meal2.calories - desiredCaloriesPerMeal);
        return diff1 - diff2;
      });

      const sortedSnacks = filteredSnacks.slice().sort((snack1, snack2) => {
      const diff1 = Math.abs(snack1.calories - desiredCaloriesPerSnack );
      const diff2 = Math.abs(snack2.calories - desiredCaloriesPerSnack);
      return diff1 - diff2;
      });

      let selectedMeals: any[] = [];
      
      let selectedSnacks: any[] = [];
      let totalSelectedCalories = 0;

      for (const meal of sortedMeals) {
        if (selectedMeals.length < numberOfMeals) {
          selectedMeals.push(meal);
          totalSelectedCalories += meal.calories;
        } else {
          break;
        }
      }

      for(const snack of sortedSnacks) {
        if(selectedSnacks.length < numberOfSnacks) {
          selectedSnacks.push(snack);
          totalSelectedCalories += snack.calories;
        } else {
          break;
        }
      }
      for (let i = 0; i < selectedMeals.length; i++) {
        const meal = selectedMeals[i];
      
        if (i === 0) {
          meal.label = 'Breakfast';
        } else if (i === 1) {
          meal.label = 'Lunch';
        } else if (i === 2) {
          meal.label = 'Dinner';
        } else if (i === 3) {
          meal.label = 'Supper';
        } else {
          meal.label = 'Meal ' + (i + 1);
        }
      }
      

      this.filteredMeals = selectedMeals;
      this.filteredSnacks = selectedSnacks;
      this.calculateTotals()
    }
  }

  filterMealsByDietaryPreference(preference: string) {
    return this.meals.filter((meal) =>
      meal.dietaryPreference.includes(preference)
    );
  }
  
 
}
