import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HairdresserListComponent } from './hairdresser-list.component';

describe('HairdresserListComponent', () => {
  let component: HairdresserListComponent;
  let fixture: ComponentFixture<HairdresserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HairdresserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HairdresserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
