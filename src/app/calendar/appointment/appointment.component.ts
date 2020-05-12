import { Component, OnInit } from "@angular/core";
import { AppointmentDataService } from "../appointment-data.service";
import { Appointment } from "src/app/appointment.model";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-appointment",
  templateUrl: "./appointment.component.html",
  styleUrls: ["./appointment.component.scss"],
})
export class AppointmentComponent implements OnInit {
  public appointment: Appointment;
  constructor(
    private route: ActivatedRoute,
    private appointmentDataService: AppointmentDataService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(
      (item) => (this.appointment = item["appointment"])
    );
    console.log(this.appointment);
  }

  removeAppointment() {}
}
