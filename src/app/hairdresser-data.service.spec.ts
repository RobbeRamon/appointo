import { TestBed } from '@angular/core/testing';

import { HairdresserDataService } from './hairdresser-data.service';

describe('HairdresserDataService', () => {
  let service: HairdresserDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HairdresserDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
