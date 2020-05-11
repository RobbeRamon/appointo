import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHairdresserComponent } from './edit-hairdresser.component';

describe('EditHairdresserComponent', () => {
  let component: EditHairdresserComponent;
  let fixture: ComponentFixture<EditHairdresserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditHairdresserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHairdresserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
