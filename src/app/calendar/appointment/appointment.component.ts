import { Component, OnInit } from "@angular/core";
import { AppointmentDataService } from "../appointment-data.service";
import { Appointment } from "src/app/appointment.model";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-appointment",
  templateUrl: "./appointment.component.html",
  styleUrls: ["./appointment.component.scss"],
})
export class AppointmentComponent implements OnInit {
  public appointment: Appointment;
  public warningMessage: string;
  constructor(
    private route: ActivatedRoute,
    private appointmentDataService: AppointmentDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(
      (item) => (this.appointment = item["appointment"])
    );
  }

  deleteAppointment() {
    this.warningMessage = "Ben je zeker dat je deze afspraak wil verwijderen?";
  }

  confirmDeleteAppointment() {
    this.appointmentDataService.deleteAppointment(this.appointment);
    this.router.navigate(["/manage/calendar"]);
  }
}
