import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProteinsComponent } from './proteins.component';

describe('ProteinsComponent', () => {
  let component: ProteinsComponent;
  let fixture: ComponentFixture<ProteinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProteinsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProteinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
