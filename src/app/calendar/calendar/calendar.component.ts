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
    this.fillCalendar();
    this._appointmentData.startConnection();
    this._appointmentData.addAppointmentsListener();
  }

  addEvent(title: string, date: Date, id: number, duration: number) {
    this.calendarEvents = this.calendarEvents.concat({
      title: title,
      start: date.toString(),
      url: `manage/appointment/${id}`,
      end: add_minutes(date, duration),
    });
  }

  fillCalendar() {
    this._appointmentData.allAppointemnts$.subscribe((apps: Appointment[]) => {
      this.calendarEvents = [];
      apps.forEach((app) => {
        let durationInMinutes = app.treatments
          .map((tr) => tr.duration.allInMinutes)
          .reduce((res, value) => res + value);

        this.addEvent(
          `${app.firstname} ${app.lastname}`,
          app.startMoment,
          app.id,
          durationInMinutes
        );
      });
    });
  }
}

let add_minutes = function (dt, minutes) {
  return new Date(new Date(dt).getTime() + minutes * 60000);
};
