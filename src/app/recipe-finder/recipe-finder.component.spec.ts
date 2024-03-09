import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeFinderComponent } from './recipe-finder.component';

describe('RecipeFinderComponent', () => {
  let component: RecipeFinderComponent;
  let fixture: ComponentFixture<RecipeFinderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeFinderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecipeFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
