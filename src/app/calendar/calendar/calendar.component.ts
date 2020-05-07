import { Component, OnInit } from "@angular/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import nlLocale from "@fullcalendar/core/locales/nl";
import { AppointmentDataService } from "../appointment-data.service";
import { Appointment } from "src/app/appointment.model";

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"],
})
export class CalendarComponent implements OnInit {
  public calendarPlugins = [dayGridPlugin, timeGridPlugin];
  public locales = [nlLocale];
  public calendarEvents = [];

  constructor(private _appointmentData: AppointmentDataService) {}

  ngOnInit(): void {
    this.addEvent("event 2", "2020-05-07");
    this.fillCalendar();
    this._appointmentData.startConnection();
    this._appointmentData.addAppointmentsListener();
  }

  addEvent(title: string, date: string) {
    this.calendarEvents = this.calendarEvents.concat({
      title: title,
      date: date,
    });
  }

  fillCalendar() {
    this._appointmentData.allAppointemnts$.subscribe((apps: Appointment[]) => {
      this.calendarEvents = [];
      apps.forEach((app) => {
        this.addEvent(app.startMoment.toString(), app.startMoment.toString());
      });
    });
  }
}
