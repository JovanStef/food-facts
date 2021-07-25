import { TestBed } from '@angular/core/testing';

import { AlergensServiceService } from './alergens-service.service';

describe('AlergensServiceService', () => {
  let service: AlergensServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlergensServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
