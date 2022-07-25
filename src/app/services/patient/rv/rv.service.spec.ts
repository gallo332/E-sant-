import { TestBed } from '@angular/core/testing';

import { RvService } from './rv.service';

describe('RvService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RvService = TestBed.get(RvService);
    expect(service).toBeTruthy();
  });
});
