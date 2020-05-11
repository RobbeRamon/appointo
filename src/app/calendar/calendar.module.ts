import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CalendarComponent } from "./calendar/calendar.component";
import { FullCalendarModule } from "@fullcalendar/angular";
import { Routes, RouterModule } from "@angular/router";
import { AppointmentComponent } from './appointment/appointment.component';

const routes: Routes = [{ path: "calendar", component: CalendarComponent }];

@NgModule({
  declarations: [CalendarComponent, AppointmentComponent],
  imports: [CommonModule, FullCalendarModule, RouterModule.forChild(routes)],
})
export class CalendarModule {}
