import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealPlannerComponent } from './meal-planner.component';

describe('MealPlannerComponent', () => {
  let component: MealPlannerComponent;
  let fixture: ComponentFixture<MealPlannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MealPlannerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MealPlannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
