import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-caloriecalculator',
  templateUrl: './caloriecalculator.component.html',
  styleUrl: './caloriecalculator.component.css'
})
export class CaloriecalculatorComponent implements OnInit{
  CalorieForm!: FormGroup;
  TotalCalorie: number = 0;

  constructor(private fb: FormBuilder) {}

ngOnInit(): void {
  this.CalorieForm = this.fb.group({
    gender: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
      height: ['', [Validators.required, Validators.min(60), Validators.max(240)]],
      weight: ['', [Validators.required, Validators.min(1), Validators.max(500)]],
      activity: ['', Validators.required],
      goal: ['', Validators.required]
})
}

  calculateCalories(): void {
    
      const age = this.CalorieForm.get('age')?.value;
      const gender = this.CalorieForm.get('gender')?.value;
      const weight = this.CalorieForm.get('weight')?.value;
      const height = this.CalorieForm.get('height')?.value;
      const activityLevel = this.CalorieForm.get('activity')?.value;
      const weightGoal = this.CalorieForm.get('goal')?.value;
     
      let bmr: number = 0;
      if (gender === 'male') {
        // BMR for males
        bmr = 10 * weight + 6.25 * height - 5 * age + 5; // using Mifflin-St Jeor equation
      } else if (gender === 'female') {
        // BMR for females
        bmr = 10 * weight + 6.25 * height - 5 * age - 161; // using Mifflin-St Jeor equation
      }
  
      let tdee = 0;
      switch (activityLevel) {
        case 'sedentary':
          tdee = bmr * 1.2;
          break;
        case 'light':
          tdee = bmr * 1.375;
          break;
        case 'moderate': 
          tdee = bmr * 1.55;
          break;
        case 'very': 
          tdee = bmr * 1.725;
          break;
        case 'extra':
          tdee = bmr * 1.9;
          break;
        default:
      }

      switch (weightGoal) {
        case 'lose-10':
          tdee *= 0.90; // Reduce 10%
          break;
        case 'lose-20':
          tdee *= 0.80; // Reduce 20%
          break;
        case 'lose-30':
          tdee *= 0.70; // Reduce 30%
          break;
        case 'lose-40':
          tdee *= 0.60; // Reduce 40%
          break;
        case 'maintain':
          // TDEE remains unchanged
          break;
        case 'gain-10':
          tdee *= 1.10; // Increase 10%
          break;
        case 'gain-20':
          tdee *= 1.20; // Increase 20%
          break;
        case 'gain-30':
          tdee *= 1.30; // Increase 30%
          break;
        case 'gain-40':
          tdee *= 1.40; // Increase 40%
          break;
      }
  
      // Display or store the calculated total calories
     this.TotalCalorie = tdee
    } 
  }

