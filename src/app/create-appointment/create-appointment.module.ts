import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CreateAppointmentComponent } from "./create-appointment/create-appointment.component";
import { MdbootstrapModule } from "../mdbootstrap/mdbootstrap.module";
import { MaterialModule } from "../material/material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { AvailableHoursComponent } from "./available-hours/available-hours.component";

@NgModule({
  declarations: [CreateAppointmentComponent, AvailableHoursComponent],
  imports: [
    CommonModule,
    MdbootstrapModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class CreateAppointmentModule {}
