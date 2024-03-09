import { TestBed } from '@angular/core/testing';

import { RecipefinderService } from './recipefinder.service';

describe('RecipefinderService', () => {
  let service: RecipefinderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipefinderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
