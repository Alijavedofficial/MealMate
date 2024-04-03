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
  breakfast: any[] = [];
  lunch: any[] = [];
  dinner: any[] = [];
  supper: any[] = [];
  snacks: any[] = [];
  filteredMeals: any[] = [];
  filteredSnacks: any[] = [];
  totalCalories: number = 0;
  totalProtein: number = 0;
  totalCarbs: number = 0;
  totalFat: number = 0;
  TotalSugar: number = 0;
  TotalFiber: number = 0;
  isLoading: boolean = false;
  errorMessage: string = '';

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
     
    });
   
  }

  ngOnInit(): void {
    this.mealService.getBreakfast().pipe(untilDestroyed(this)).subscribe((data) => {
          this.breakfast = data},(error) => { console.error('error fetching Breakfast', error)}
      );
    this.mealService.getLunch().pipe(untilDestroyed(this)).subscribe((data) => {
          this.lunch = data},(error) => { console.error('error fetching Lunch', error)}
      );
    this.mealService.getDinner().pipe(untilDestroyed(this)).subscribe((data) => {
          this.dinner = data},(error) => { console.error('error fetching Dinner', error)}
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

    for (const item of [...this.filteredMeals]) {
      totals.totalCalories += item.totalcal;
      for(const food of item.foods) {
      totals.totalProtein += food.protein;
      totals.TotalFiber += food.fiber;
      totals.TotalSugar += food.sugar;
      totals.totalFat += food.fat;
      totals.totalCarbs += food.carbs;
    }
    }

    Object.assign(this, totals);
  }

  generateMealPlan() {
 this.errorMessage = ''
    if(this.mealform.valid) {

    const totalCalories = this.mealform.get('TotalCalories')?.value;
    const numberOfMeals = this.mealform.get('numberOfMeals')?.value;
    const dietaryPreference = this.mealform.get('dietaryPreference')?.value;
    const region = this.mealform.get('region')?.value;
    
    if (!totalCalories || !numberOfMeals) {
      return; // Do nothing if total calories or number of meals is not provided
    } 
    
    const desiredCaloriesPerMeal = Math.round(totalCalories / numberOfMeals);

    let numberOfBreakfastMeals: number = 0
    let numberOfLunchMeals: number = 0
    let numberOfDinnerMeals: number = 0
    let numberOfSupperMeals: number = 0

    if(numberOfMeals == 2) {
      numberOfBreakfastMeals = 1
      numberOfLunchMeals = 1
    } else if(numberOfMeals == 3) {
      numberOfBreakfastMeals = 1
      numberOfLunchMeals = 1
      numberOfDinnerMeals = 1
    } else if(numberOfMeals == 4){
      numberOfBreakfastMeals = 1
      numberOfLunchMeals = 1
      numberOfDinnerMeals = 1
      numberOfSupperMeals = 1
    }

    let filteredMeals: any[] = [];

    const breakfastOptions = this.filterAndSortMeals(this.breakfast, desiredCaloriesPerMeal, dietaryPreference, region);

    const lunchOptions = this.filterAndSortMeals(this.lunch, desiredCaloriesPerMeal, dietaryPreference, region);

    const dinnerOptions = this.filterAndSortMeals(this.dinner, desiredCaloriesPerMeal, dietaryPreference, region);
    
    const breakfastMeals = this.selectItems(breakfastOptions, numberOfBreakfastMeals);

    const lunchMeals = this.selectItems(lunchOptions, numberOfLunchMeals);

    const dinnerMeals = this.selectItems(dinnerOptions, numberOfDinnerMeals);
    
  
    
    const mealPlan = breakfastMeals.concat(lunchMeals, dinnerMeals);
    this.filteredMeals = mealPlan;
  
    this.calculateTotals();
  } else {
    this.errorMessage = 'Please fill correct info...'
  }
}
  

  filterAndSortMeals(meals: any[], desiredCalories: number, dietaryPreference: string, region: string): any[] {
    let filteredMeals = meals;
    if (dietaryPreference && dietaryPreference !== 'none') {
      filteredMeals = filteredMeals.filter((meal) => meal.dietaryPreference.includes(dietaryPreference))
    }
    if (region && region !== 'none') {
      filteredMeals = filteredMeals.filter((meal) => meal.region.includes(region));
    }
    const sortedMeals = this.sortByCaloriesDifference(filteredMeals, desiredCalories);
    return sortedMeals;
  }


  sortByCaloriesDifference(items: any[], desiredCalories: number): any[] {
    return items.slice().sort((item1, item2) => {
      const diff1 = Math.abs(item1.totalcal - desiredCalories);
      const diff2 = Math.abs(item2.totalcal - desiredCalories);
      return diff1 - diff2;
    });
  }
  
 selectItems(items: any[], count: number): any[] {
    return items.slice(0, count);
  }
   
  
 

}