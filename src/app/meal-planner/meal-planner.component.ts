import { Component, OnInit } from '@angular/core';
import { MealPlanService } from '../Services/meal-plan.service';
import { FormGroup,FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';



@Component({
  selector: 'app-meal-planner',
  templateUrl: './meal-planner.component.html',
  styleUrl: './meal-planner.component.css'
})
export class MealPlannerComponent implements OnInit{
 
  meals: any[] = [];
  filteredMeals: any[] = [];
  maxCalories: number = 0;

  constructor(private mealService: MealPlanService) { }

  ngOnInit(): void {
    this.mealService.getMeals().subscribe(data => {
      this.meals = data;
    });
  }

  filterMeals() {
    this.filteredMeals = this.mealService.filterMealsByCalories(this.meals, this.maxCalories);
  }
}
