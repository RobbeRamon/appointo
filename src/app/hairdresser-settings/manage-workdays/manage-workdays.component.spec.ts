import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageWorkdaysComponent } from './manage-workdays.component';

describe('ManageWorkdaysComponent', () => {
  let component: ManageWorkdaysComponent;
  let fixture: ComponentFixture<ManageWorkdaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageWorkdaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageWorkdaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
