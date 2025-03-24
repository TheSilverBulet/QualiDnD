import { TestBed } from '@angular/core/testing';

import { FormUtilityService } from './form-utility.service';

describe('FormUtilityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormUtilityService = TestBed.get(FormUtilityService);
    expect(service).toBeTruthy();
  });
});
