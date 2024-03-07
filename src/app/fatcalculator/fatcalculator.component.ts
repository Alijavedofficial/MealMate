import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-fatcalculator',
  templateUrl: './fatcalculator.component.html',
  styleUrl: './fatcalculator.component.css',
})
export class FatcalculatorComponent implements OnInit {
  fatForm!: FormGroup;
  totalFat: number = 0;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.fatForm = this.fb.group({
      weight: ['',[Validators.required, Validators.min(1), Validators.max(500)],],
      gender: ['', Validators.required],
      waist: ['', Validators.required],
      hip: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
      neck: ['', Validators.required],
      height: ['', [Validators.required, Validators.min(60), Validators.max(240)]],
    });
  }

  calculateFat(): void {
    const weight = this.fatForm.get('weight')?.value;
    const gender = this.fatForm.get('gender')?.value;
    const waist = this.fatForm.get('waist')?.value;
    const hip = this.fatForm.get('hip')?.value;
    const neck = this.fatForm.get('neck')?.value;
    const height = this.fatForm.get('height')?.value;

  let bodyFatPercentage: number;
  if (gender === 'male') {
    bodyFatPercentage = 86.010 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76;
  } else{
    bodyFatPercentage = 163.205 * Math.log10(waist + (hip || 0) - neck) - 97.684 * Math.log10(height) - 78.387;
  }
    this.totalFat=  bodyFatPercentage;
   
  }
}
