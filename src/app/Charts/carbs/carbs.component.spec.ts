import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarbsComponent } from './carbs.component';

describe('CarbsComponent', () => {
  let component: CarbsComponent;
  let fixture: ComponentFixture<CarbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarbsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
