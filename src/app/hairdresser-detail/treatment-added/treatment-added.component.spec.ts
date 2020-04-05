import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentAddedComponent } from './treatment-added.component';

describe('TreatmentAddedComponent', () => {
  let component: TreatmentAddedComponent;
  let fixture: ComponentFixture<TreatmentAddedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreatmentAddedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatmentAddedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
