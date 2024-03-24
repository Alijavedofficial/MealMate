import { AfterViewInit, Component, ElementRef, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MealPlanService } from '../Services/meal-plan.service';
import gsap from 'gsap';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-meal-planner',
  templateUrl: './meal-planner.component.html',
  styleUrl: './meal-planner.component.css',
})
export class MealPlannerComponent implements OnInit,AfterViewInit {
  //Initialization
  @ViewChild('mealForm') mealForm?: ElementRef;
  mealform: FormGroup;
  meals: any[] = [];
  snacks: any[] = [];
  filteredMeals: any[] = [];
  filteredSnacks: any[] = [];
  totalCalories: number = 0;
  totalProtein: number = 0;
  totalCarbs: number = 0;
  totalFat: number = 0;
  TotalSugar: number = 0;
  TotalFiber: number = 0;
  meallabel: string = '';
  showFullContent: boolean[] = [];
  isLoading: boolean = false;

  constructor(
    private mealService: MealPlanService,
    private fb: FormBuilder,
  ) {
    this.mealform = this.fb.group({
      TotalCalories: [
        ,
        [Validators.required, Validators.min(1200), Validators.max(3000)],
      ],
      numberOfMeals: [
        ,
        [Validators.required, Validators.min(1), Validators.max(5)],
      ],
      dietaryPreference: ['', Validators.required],
      numberOfSnacks: [, [Validators.required, Validators.max(2)]],
      region: ['', Validators.required],
    });
    this.meals.forEach(() => this.showFullContent.push(false));
  }

  ngOnInit(): void {
    this.mealService
      .getMeals()
      .pipe(untilDestroyed(this))
      .subscribe(
        (data) => {
          this.meals = data;
        },
        (error) => {
          console.error('error fetching Meals', error);
        }
      );
    this.mealService
      .getSnacks()
      .pipe(untilDestroyed(this))
      .subscribe(
        (data) => {
          this.snacks = data;
        },
        (error) => {
          console.error('error fetching Snacks', error);
        }
      );
  }

  ngAfterViewInit(): void {
      this.MealFormAnimation()
  }

  MealFormAnimation(): void {
    gsap.from(this.mealForm?.nativeElement, {
       y: 50,
       duration: 1.2,
       opacity: 0,
       ease: 'power3.inOut',
    });
    
   
    
   }
   
  //This method allows to wait  for showing the meal plan
  showLoader() {
    this.isLoading = true;
    setTimeout(() => {
      this.generateMealPlan();
      this.isLoading = false;
    }, 1000);
  }

  //This method calculates total for all the nutrients and calories of the generated meal plan
  calculateTotals() {
    const totals = {
      totalCalories: 0,
      totalProtein: 0,
      TotalFiber: 0,
      TotalSugar: 0,
      totalCarbs: 0,
      totalFat: 0,
    };

    for (const item of [...this.filteredMeals, ...this.filteredSnacks]) {
      totals.totalCalories += item.calories;
      totals.totalProtein += item.protein;
      totals.TotalFiber += item.fiber;
      totals.TotalSugar += item.sugar;
      totals.totalFat += item.fat;
      totals.totalCarbs += item.carbs;
    }

    Object.assign(this, totals);
  }

  generateMealPlan() {
    const totalCalories = this.mealform.get('TotalCalories')?.value;
    const numberOfMeals = this.mealform.get('numberOfMeals')?.value;
    const dietaryPreference = this.mealform.get('dietaryPreference')?.value;
    const region = this.mealform.get('region')?.value;
    
    if (!totalCalories || !numberOfMeals) {
      return; // Do nothing if total calories or number of meals is not provided
    }
    
    const mealCalories = totalCalories * 0.9;
    const desiredCaloriesPerMeal = Math.round(mealCalories / numberOfMeals);
    
    let filteredMeals = this.meals;
    
    if (dietaryPreference && dietaryPreference !== 'none') {
      filteredMeals = filteredMeals.filter((meal) => meal.dietaryPreference.includes(dietaryPreference))
    }
    
    if (region && region !== 'none') {
      filteredMeals = filteredMeals.filter((meal) => meal.region.includes(region));
    }
    
    const sortedMeals = this.sortByCaloriesDifference(filteredMeals, desiredCaloriesPerMeal);
    
    const selectedMeals = this.selectItems(sortedMeals, numberOfMeals);
    
    this.filteredMeals = this.labelItems(selectedMeals, 'Meal');
    
    this.calculateTotals();
  }
  
  private sortByCaloriesDifference(items: any[], desiredCalories: number): any[] {
    return items.slice().sort((item1, item2) => {
      const diff1 = Math.abs(item1.calories - desiredCalories);
      const diff2 = Math.abs(item2.calories - desiredCalories);
      return diff1 - diff2;
    });
  }
  
  private selectItems(items: any[], count: number): any[] {
    return items.slice(0, count);
  }
  
  private labelItems(meals: any[], prefix: string): any[] {
    return meals.map((meal, index) => {
      meal.label = `${prefix} ${index + 1}`;
      return meal;
    });
  }

}