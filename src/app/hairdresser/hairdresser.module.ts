import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HairdresserComponent } from './hairdresser.component';
import { TreatmentComponent } from '../treatment/treatment.component';
import { AppointmentComponent } from '../appointment/appointment.component';



@NgModule({
  declarations: [HairdresserComponent, TreatmentComponent, AppointmentComponent],
  imports: [
    CommonModule
  ]
})
export class HairdresserModule { }
