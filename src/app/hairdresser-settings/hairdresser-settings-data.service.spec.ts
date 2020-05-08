import { TestBed } from '@angular/core/testing';

import { HairdresserSettingsDataService } from './hairdresser-settings-data.service';

describe('HairdresserSettingsDataService', () => {
  let service: HairdresserSettingsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HairdresserSettingsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
