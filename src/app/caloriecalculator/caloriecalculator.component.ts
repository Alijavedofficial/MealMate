import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import * as Highcharts from 'highcharts';
@Component({
  selector: 'app-caloriecalculator',
  templateUrl: './caloriecalculator.component.html',
  styleUrl: './caloriecalculator.component.css',
})
export class CaloriecalculatorComponent implements OnInit {
  CalorieForm!: FormGroup;
  upperBound: number = 0;
  lowerBound: number = 0;
  proteins: number = 0;
  carbs: number = 0;
  fats: number = 0;
  maxproteins: number = 0;
  maxcarbs: number = 0;
  pieChartData: any[] = [];
  pieChart!: Highcharts.Chart;
  maxfats: number = 0;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.CalorieForm = this.fb.group({
      gender: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
      height: [
        '',
        [Validators.required, Validators.min(60), Validators.max(240)],
      ],
      weight: [
        '',
        [Validators.required, Validators.min(10), Validators.max(300)],
      ],
      activity: ['', Validators.required],
      goal: ['', Validators.required],
      macros: ['', Validators.required],
    });

    this.initializeChart()
    
  }

  calculateCalories(): void {
    const age = this.CalorieForm.get('age')?.value;
    const gender = this.CalorieForm.get('gender')?.value;
    const weight = this.CalorieForm.get('weight')?.value;
    const height = this.CalorieForm.get('height')?.value;
    const activityLevel = this.CalorieForm.get('activity')?.value;
    const weightGoal = this.CalorieForm.get('goal')?.value;
    const macros = this.CalorieForm.get('macros')?.value;

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
        tdee *= 0.9; // Reduce 10%
        break;
      case 'lose-20':
        tdee *= 0.8; // Reduce 20%
        break;
      case 'lose-30':
        tdee *= 0.7; // Reduce 30%
        break;
      case 'lose-40':
        tdee *= 0.6; // Reduce 40%
        break;
      case 'maintain':
        // TDEE remains unchanged
        break;
      case 'gain-10':
        tdee *= 1.1; // Increase 10%
        break;
      case 'gain-20':
        tdee *= 1.2; // Increase 20%
        break;
      case 'gain-30':
        tdee *= 1.3; // Increase 30%
        break;
      case 'gain-40':
        tdee *= 1.4; // Increase 40%
        break;
    }

    this.upperBound = tdee * 1.05;
    this.lowerBound = tdee * 0.95;

    let carbohydrateMinPercentage = 35;
    let carbohydrateMaxPercentage = 45;
    let proteinMinPercentage = 25;
    let proteinMaxPercentage = 35;
    let fatMinPercentage = 25;
    let fatMaxPercentage = 35;

    

    switch (macros) {
      case 'low-carb':
        carbohydrateMinPercentage = 15;
        carbohydrateMaxPercentage = 25;
        fatMaxPercentage = 60;
        fatMinPercentage = 50;
        proteinMinPercentage = 20;
        proteinMaxPercentage = 30;
        break;
      case 'low-fat':
        carbohydrateMinPercentage = 55;
        carbohydrateMaxPercentage = 65;
        fatMaxPercentage = 25;
        fatMinPercentage = 15;
        proteinMinPercentage = 15;
        proteinMaxPercentage = 25;
        break;
      case 'high-protein':
        carbohydrateMinPercentage = 35;
        carbohydrateMaxPercentage = 45;
        fatMaxPercentage = 15;
        fatMinPercentage = 5;
        proteinMinPercentage = 45;
        proteinMaxPercentage = 55;
        break;
      case 'keto':
        carbohydrateMinPercentage = 5;
        carbohydrateMaxPercentage = 15;
        fatMaxPercentage = 75;
        fatMinPercentage = 65;
        proteinMinPercentage = 15;
        proteinMaxPercentage = 25;
        break;
    }

   // Calculate macronutrient targets based on percentage ranges
   const carbohydrateMinCalories = tdee * (carbohydrateMinPercentage / 100);
   const carbohydrateMaxCalories = tdee * (carbohydrateMaxPercentage / 100);
   const proteinMinCalories = tdee * (proteinMinPercentage / 100);
   const proteinMaxCalories = tdee * (proteinMaxPercentage / 100);
   const fatMinCalories = tdee * (fatMinPercentage / 100);
   const fatMaxCalories = tdee * (fatMaxPercentage / 100);

   // Convert macronutrient calories to grams
   const carbohydrateMinGrams = carbohydrateMinCalories / 4; // 4 calories per gram of carbohydrate
   const carbohydrateMaxGrams = carbohydrateMaxCalories / 4;
   const proteinMinGrams = proteinMinCalories / 4; // 4 calories per gram of protein
   const proteinMaxGrams = proteinMaxCalories / 4;
   const fatMinGrams = fatMinCalories / 9; // 9 calories per gram of fat
   const fatMaxGrams = fatMaxCalories / 9;

   // Convert macronutrient calories to grams
   this.carbs = carbohydrateMinGrams; // 4 calories per gram of carbohydrate
   this.proteins = proteinMinGrams;
   this.fats = fatMinGrams;

   this.maxcarbs = carbohydrateMaxGrams;
   this.maxproteins = proteinMaxGrams;
   this.maxfats = fatMaxGrams; 
   
   this.pieChartData = [
    { name: 'Carbohydrates', y: this.carbs },
    { name: 'Protein', y: this.proteins },
    { name: 'Fat', y: this.fats }
  ];

  this.pieChart.update({
    series: [
      {
        type: 'pie',
        data: this.pieChartData
      }
    ]
  })

  }


  initializeChart() {
    
    this.pieChart = Highcharts.chart('pieChart', {
      chart: {
        type: 'pie',
        plotShadow: false,
      backgroundColor: 'rgba(0, 0, 0, 0)',
      },
      credits: {
        enabled: false,
      },
      plotOptions: {
        pie: {
          innerSize: '0%',
          borderWidth: 0,
          borderColor: '',
          slicedOffset: 0,
          borderRadius: 0,
          dataLabels: {
            enabled: true,
            format: '{point.percentage:.1f}%',
            distance: -30, 
            style: {
              fontWeight: 'bold',
              color: 'white'
            }
          },
          tooltip: {
            headerFormat: '<div style="background-color:red;"><span style="font-size: 14px; font-weight: bold;color:#4663ac;">{point.key}</span></div><br/>',
           pointFormat: '<span style="font-weight: bold">{series.name}:</span> <span style="font-weight: bold;color:red">${point.y}</span><br/>',
          }
        },
      },
      legend: {
        enabled: false,
      },
      title: {
        text: 'Macro Distribution'
      },
      series: [
      {
        type: 'pie',
        data: this.pieChartData
      },
    ],
    })
  }
}
