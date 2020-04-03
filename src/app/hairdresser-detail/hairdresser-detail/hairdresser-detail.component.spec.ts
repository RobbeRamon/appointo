import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HairdresserDetailComponent } from './hairdresser-detail.component';

describe('HairdresserDetailComponent', () => {
  let component: HairdresserDetailComponent;
  let fixture: ComponentFixture<HairdresserDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HairdresserDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HairdresserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
