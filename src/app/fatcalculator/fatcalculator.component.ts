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
      weight: [
        '',
        [Validators.required, Validators.min(1), Validators.max(500)],
      ],
      gender: ['', Validators.required],
      waist: ['', Validators.required],
      hip: ['', Validators.required],
      neck: ['', Validators.required],
    });
  }

  calculateFat(): void {
    const weight = this.fatForm.get('weight')?.value;
    const gender = this.fatForm.get('gender')?.value;
    const waist = this.fatForm.get('waist')?.value;
    const hip = this.fatForm.get('hip')?.value;
    const neck = this.fatForm.get('neck')?.value;

    let bodyFatPercentage: number;

    if (gender === 'male') {
      const fatMass = weight * 0.29288 + waist * 0.15765 - neck * 0.064 + 32.0;
      bodyFatPercentage = (fatMass * 100) / weight;
    } else {
      const fatMass = weight * 0.29669 + waist * 0.073 + hip * 0.24568 - neck * 0.15456 + 5.0;
    bodyFatPercentage = (fatMass * 100) / weight;
    }
    this.totalFat=  bodyFatPercentage;
  }
}
