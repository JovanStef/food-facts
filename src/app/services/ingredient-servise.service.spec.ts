import { TestBed } from '@angular/core/testing';

import { IngredientServiseService } from './ingredient-servise.service';

describe('IngredientServiseService', () => {
  let service: IngredientServiseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngredientServiseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
