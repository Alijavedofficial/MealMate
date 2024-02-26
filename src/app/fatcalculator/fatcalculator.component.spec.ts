import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FatcalculatorComponent } from './fatcalculator.component';

describe('FatcalculatorComponent', () => {
  let component: FatcalculatorComponent;
  let fixture: ComponentFixture<FatcalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FatcalculatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FatcalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
