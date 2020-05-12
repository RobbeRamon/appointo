import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CalendarComponent } from "./calendar/calendar.component";
import { FullCalendarModule } from "@fullcalendar/angular";
import { Routes, RouterModule } from "@angular/router";
import { AppointmentComponent } from "./appointment/appointment.component";
import { AppointmentResolver } from "./AppointmentResolver";
import { MdbootstrapModule } from "../mdbootstrap/mdbootstrap.module";

const routes: Routes = [
  { path: "calendar", component: CalendarComponent },
  {
    path: "appointment/:id",
    component: AppointmentComponent,
    resolve: { appointment: AppointmentResolver },
  },
];

@NgModule({
  declarations: [CalendarComponent, AppointmentComponent],
  imports: [
    CommonModule,
    FullCalendarModule,
    MdbootstrapModule,
    RouterModule.forChild(routes),
  ],
})
export class CalendarModule {}
