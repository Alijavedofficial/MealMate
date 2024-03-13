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
    const mealCalories = totalCalories * 0.8;
    const snackCalories = totalCalories * 0.2;

    if (totalCalories && numberOfMeals) {
      const desiredCaloriesPerMeal = Math.round(mealCalories / numberOfMeals);
      const desiredCaloriesPerSnack = Math.round(
        snackCalories / numberOfSnacks
      );

      let filteredMeals = this.meals;

      if (dietaryPreference) {
        filteredMeals = this.filterMealsByDietaryPreference(dietaryPreference);
      }
      if (region) {
        if (region === 'none') {
          this.filteredMeals = this.meals;
        } else {
          filteredMeals = filteredMeals.filter((meal) =>
            meal.region.includes(region)
          );
        }
      }

      let filteredSnacks = this.snacks;

      const sortedMeals = filteredMeals.slice().sort((meal1, meal2) => {
        const diff1 = Math.abs(meal1.calories - desiredCaloriesPerMeal);
        const diff2 = Math.abs(meal2.calories - desiredCaloriesPerMeal);
        return diff1 - diff2;
      });

      const sortedSnacks = filteredSnacks.slice().sort((snack1, snack2) => {
        const diff1 = Math.abs(snack1.calories - desiredCaloriesPerSnack);
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

      for (const snack of sortedSnacks) {
        if (selectedSnacks.length < numberOfSnacks) {
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

      for (let i = 0; i < selectedSnacks.length; i++) {
        const snack = selectedSnacks[i];

        if (i === 0) {
          snack.label = 'Nibbles';
        } else if (i === 1) {
          snack.label = 'Munch';
        } else {
          snack.label = 'Snack 3';
        }
      }

      this.filteredMeals = selectedMeals;
      this.filteredSnacks = selectedSnacks;
      this.calculateTotals();
    }
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

  changeMeals() {
    const dietaryPreference = this.mealform.get('dietaryPreference')?.value;
    const region = this.mealform.get('region')?.value;

    this.shuffleArray(this.meals);
    this.shuffleArray(this.snacks);

    let filteredMeals = this.filterMealsByDietaryPreference(dietaryPreference);
    filteredMeals = this.filterMealsByRegion(region);

    this.filteredMeals = filteredMeals.slice(
      0,
      this.mealform.get('numberOfMeals')?.value
    );
    this.filteredSnacks = this.snacks.slice(
      0,
      this.mealform.get('numberOfSnacks')?.value
    );

    for (let i = 0; i < this.filteredMeals.length; i++) {
      const meal = this.filteredMeals[i];

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
    for (let i = 0; i < this.filteredSnacks.length; i++) {
      const snack = this.filteredSnacks[i];

      if (i === 0) {
        snack.label = 'Nibbles';
      } else if (i === 1) {
        snack.label = 'Munch';
      } else {
        snack.label = 'Snack 3';
      }
    }
    this.calculateTotals();
  }

  shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  showLoader2() {
    this.isLoading = true;
    setTimeout(() => {
      this.changeMeals();
      this.isLoading = false;
    }, 3000);
  }

  toggleContent(index: number): void {
    this.showFullContent[index] = !this.showFullContent[index];
  }
}
