import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CaloriecalculatorComponent } from './caloriecalculator/caloriecalculator.component';
import { FatcalculatorComponent } from './fatcalculator/fatcalculator.component';
import { MealPlannerComponent } from './meal-planner/meal-planner.component';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ArticlesComponent } from './articles/articles.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoginComponent } from './login/login.component';
import { RecipeFinderComponent } from './recipe-finder/recipe-finder.component';
import { NutrientrecipeComponent } from './nutrientrecipe/nutrientrecipe.component';


@NgModule({
  declarations: [
    AppComponent,
    CaloriecalculatorComponent,
    FatcalculatorComponent,
    MealPlannerComponent,
    ArticlesComponent,
    NavbarComponent,
    LoginComponent,
    RecipeFinderComponent,
    NutrientrecipeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
