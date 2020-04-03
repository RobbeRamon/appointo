import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HairdresserSliderComponent } from './hairdresser-slider.component';

describe('HairdresserSliderComponent', () => {
  let component: HairdresserSliderComponent;
  let fixture: ComponentFixture<HairdresserSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HairdresserSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HairdresserSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
