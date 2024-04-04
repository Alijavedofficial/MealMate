import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FatsComponent } from './fats.component';

describe('FatsComponent', () => {
  let component: FatsComponent;
  let fixture: ComponentFixture<FatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FatsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
