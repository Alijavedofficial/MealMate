import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutrientsChartComponent } from './nutrients-chart.component';

describe('NutrientsChartComponent', () => {
  let component: NutrientsChartComponent;
  let fixture: ComponentFixture<NutrientsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NutrientsChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NutrientsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
