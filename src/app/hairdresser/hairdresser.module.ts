import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HairdresserComponent } from "./hairdresser/hairdresser.component";
import { TreatmentComponent } from "./treatment/treatment.component";
import { AppointmentComponent } from "./appointment/appointment.component";
import { FindHairdresserComponent } from "./find-hairdresser/find-hairdresser.component";
import { MdbootstrapModule } from "../mdbootstrap/mdbootstrap.module";

@NgModule({
  declarations: [
    HairdresserComponent,
    TreatmentComponent,
    AppointmentComponent,
    FindHairdresserComponent
  ],
  imports: [CommonModule, MdbootstrapModule],
  exports: [FindHairdresserComponent]
})
export class HairdresserModule {}
