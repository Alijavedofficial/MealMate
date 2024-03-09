import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutrientrecipeComponent } from './nutrientrecipe.component';

describe('NutrientrecipeComponent', () => {
  let component: NutrientrecipeComponent;
  let fixture: ComponentFixture<NutrientrecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NutrientrecipeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NutrientrecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
