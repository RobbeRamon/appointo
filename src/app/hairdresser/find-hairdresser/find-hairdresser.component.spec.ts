import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindHairdresserComponent } from './find-hairdresser.component';

describe('FindHairdresserComponent', () => {
  let component: FindHairdresserComponent;
  let fixture: ComponentFixture<FindHairdresserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindHairdresserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindHairdresserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
