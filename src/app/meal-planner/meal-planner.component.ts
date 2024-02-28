import { Component, OnInit } from '@angular/core';
import { MealPlanService } from '../Services/meal-plan.service';
import { FormGroup,FormBuilder } from '@angular/forms';

interface Meal {
  id: number;
  imageType: string;
  title: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
}

interface Nutrients {
 name: string,
 value: number
}
@Component({
  selector: 'app-meal-planner',
  templateUrl: './meal-planner.component.html',
  styleUrl: './meal-planner.component.css'
})
export class MealPlannerComponent implements OnInit{
 
  mealPlan: Meal[] = [];
 nutrients: Nutrients[] = [
  { name: 'Calories', value: 500 },
  { name: 'Protein', value: 20 },
  { name: 'Fat', value: 10 },
  { name: 'Carbohydrates', value: 50 }
];;
  mealForm!: FormGroup;

  constructor(
    private mealPlanService: MealPlanService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.mealForm = this.fb.group({
      calories: [''],
     
      numberOfMeals: ['']
    });
  }

  generateMealPlan() {
    const { calories, diet, numberOfMeals } = this.mealForm.value;
    this.mealPlanService.generateMealPlan(calories, numberOfMeals)
      .subscribe(response => {
        this.nutrients = response.nutrients;
        this.mealPlan = response.meals;
      });
  }
}
