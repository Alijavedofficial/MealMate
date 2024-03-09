import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MealPlannerComponent } from './meal-planner/meal-planner.component';
import { CaloriecalculatorComponent } from './caloriecalculator/caloriecalculator.component';
import { FatcalculatorComponent } from './fatcalculator/fatcalculator.component';
import { ArticlesComponent } from './articles/articles.component';
import { LoginComponent } from './login/login.component';
import { RecipeFinderComponent } from './recipe-finder/recipe-finder.component';
import { NutrientrecipeComponent } from './nutrientrecipe/nutrientrecipe.component';

const routes: Routes = [
  { path: 'planner', component: MealPlannerComponent},
  { path: '', redirectTo: '/planner', pathMatch: 'full' },
  { path: 'calorie', component: CaloriecalculatorComponent},
  { path: 'fat', component: FatcalculatorComponent},
  { path: 'recipe', component: RecipeFinderComponent},
  { path: 'ingredient', component: NutrientrecipeComponent},
  { path: 'articles', component: ArticlesComponent},
  { path: 'login', component: LoginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
