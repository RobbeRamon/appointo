import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTreatmentComponent } from './delete-treatment.component';

describe('DeleteTreatmentComponent', () => {
  let component: DeleteTreatmentComponent;
  let fixture: ComponentFixture<DeleteTreatmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteTreatmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
