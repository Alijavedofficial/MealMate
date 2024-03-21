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
    }, 3000);
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

  //This is the main method for generating the meal plan once the meal form is valid
  generateMealPlan() {
    const totalCalories = this.mealform.get('TotalCalories')?.value;
    const numberOfMeals = this.mealform.get('numberOfMeals')?.value;
    const numberOfSnacks = this.mealform.get('numberOfSnacks')?.value;
    const dietaryPreference = this.mealform.get('dietaryPreference')?.value;
    const region = this.mealform.get('region')?.value;
    
    if (!totalCalories || !numberOfMeals) {
      return; // Do nothing if total calories or number of meals is not provided
    }
    
    const mealCalories = totalCalories * 0.8;
    const snackCalories = totalCalories * 0.2;
    
    const desiredCaloriesPerMeal = Math.round(mealCalories / numberOfMeals);
    const desiredCaloriesPerSnack = Math.round(snackCalories / numberOfSnacks);
    
    let filteredMeals = this.meals;
    
    if (dietaryPreference && dietaryPreference !== 'none') {
      filteredMeals = filteredMeals.filter((meal) => meal.dietaryPreference.includes(dietaryPreference))
    }
    
    if (region && region !== 'none') {
      filteredMeals = filteredMeals.filter((meal) => meal.region.includes(region));
    }
    
    const sortedMeals = this.sortByCaloriesDifference(filteredMeals, desiredCaloriesPerMeal);
    const sortedSnacks = this.sortByCaloriesDifference(this.snacks, desiredCaloriesPerSnack);
    
    const selectedMeals = this.selectItems(sortedMeals, numberOfMeals);
    const selectedSnacks = this.selectItems(sortedSnacks, numberOfSnacks);
    
    this.filteredMeals = this.labelItems(selectedMeals, 'Meal');
    this.filteredSnacks = this.labelItems(selectedSnacks, 'Snack');
    
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
  
  private labelItems(items: any[], prefix: string): any[] {
    return items.map((item, index) => {
      item.label = index === 0 ? `${prefix} 1` : `${prefix} ${index + 1}`;
      return item;
    });
  }
  
  //This filters the meals according to the preference that user have selected in the meal form
  filterMealsByDietaryPreference(preference: string) {
    if (preference === 'none') {
      return this.meals;
    } else {
      return this.meals.filter((meal) =>
        meal.dietaryPreference.includes(preference)
      );
    }
  }

  filterMealsByRegion(region: string) {
    return this.meals.filter((meal) => meal.region.includes(region));
  }


  toggleContent(index: number): void {
    this.showFullContent[index] = !this.showFullContent[index];
  }
}
