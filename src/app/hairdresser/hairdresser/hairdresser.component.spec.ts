import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HairdresserComponent } from './hairdresser.component';

describe('HairdresserComponent', () => {
  let component: HairdresserComponent;
  let fixture: ComponentFixture<HairdresserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HairdresserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HairdresserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
