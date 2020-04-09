import { Component, OnInit } from "@angular/core";
import { CreateAppointmentService } from "src/app/create-appointment.service";

@Component({
  selector: "app-available-hours",
  templateUrl: "./available-hours.component.html",
  styleUrls: ["./available-hours.component.scss"],
})
export class AvailableHoursComponent implements OnInit {
  constructor(private _appointmentDataService: CreateAppointmentService) {}

  ngOnInit(): void {}

  public get hoursAvailable() {
    return this._appointmentDataService.hours.length > 0;
  }

  public get hours() {
    return this._appointmentDataService.hours;
  }
}
