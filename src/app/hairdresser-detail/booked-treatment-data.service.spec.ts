import { TestBed } from '@angular/core/testing';

import { BookedTreatmentDataService } from './booked-treatment-data.service';

describe('BookedTreatmentDataService', () => {
  let service: BookedTreatmentDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookedTreatmentDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
