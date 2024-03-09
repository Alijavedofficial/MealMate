import { TestBed } from '@angular/core/testing';

import { NutrientrecipeService } from './nutrientrecipe.service';

describe('NutrientrecipeService', () => {
  let service: NutrientrecipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NutrientrecipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
