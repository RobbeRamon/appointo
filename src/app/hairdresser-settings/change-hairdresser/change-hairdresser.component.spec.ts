import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeHairdresserComponent } from './change-hairdresser.component';

describe('ChangeHairdresserComponent', () => {
  let component: ChangeHairdresserComponent;
  let fixture: ComponentFixture<ChangeHairdresserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeHairdresserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeHairdresserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
