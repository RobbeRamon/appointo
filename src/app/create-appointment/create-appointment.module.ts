import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CreateAppointmentComponent } from "./create-appointment/create-appointment.component";
import { MdbootstrapModule } from "../mdbootstrap/mdbootstrap.module";
import { MaterialModule } from "../material/material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { AvailableHoursComponent } from "./available-hours/available-hours.component";
import { Routes, RouterModule } from "@angular/router";
import { HairdresserResolver } from "../hairdresser-detail/HairdresserResolver";
import { AppointmentConfirmedComponent } from "./appointment-confirmed/appointment-confirmed.component";

const routes: Routes = [
  {
    path: "hairdresser/appointment/create/:id",
    component: CreateAppointmentComponent,
    resolve: { hairdresser: HairdresserResolver },
  },
  {
    path: "hairdresser/appointment/confirm",
    component: AppointmentConfirmedComponent,
  },
];

@NgModule({
  declarations: [
    CreateAppointmentComponent,
    AvailableHoursComponent,
    AppointmentConfirmedComponent,
  ],
  imports: [
    CommonModule,
    MdbootstrapModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class CreateAppointmentModule {}
