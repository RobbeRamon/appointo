import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BookedTreatmentDataService } from "src/app/booked-treatment-data.service";
import { Hairdresser } from "src/app/hairdresser.model";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CreateAppointmentService } from "src/app/create-appointment.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-create-appointment",
  templateUrl: "./create-appointment.component.html",
  styleUrls: ["./create-appointment.component.scss"],
})
export class CreateAppointmentComponent implements OnInit {
  public hairdresser: Hairdresser;
  public datePick: FormGroup;
  private _fetchHours$: Observable<Date[]>;
  public name: FormGroup;
  private _hourValid: Boolean = false;
  public currentDate: Date = new Date();

  constructor(
    private route: ActivatedRoute,
    private _bookedTreatmentDataService: BookedTreatmentDataService,
    private fb: FormBuilder,
    private _appointmentDataService: CreateAppointmentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(
      (item) => (this.hairdresser = item["hairdresser"])
    );

    this.datePick = this.fb.group({
      date: [Validators.required],
    });

    this._fetchHours$ = this._appointmentDataService.allAvailableHours;

    this.name = this.fb.group({
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
    });

    this._appointmentDataService.resetHours();
  }

  get hours$(): Observable<Date[]> {
    return this._fetchHours$;
  }

  get treatments() {
    return this._bookedTreatmentDataService.bookedTreatments;
  }

  get hairdresserFromDataService() {
    return this._bookedTreatmentDataService.hairdresser;
  }

  get today() {
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

    console.log(date);

    return date;
  }

  get hourValid(): Boolean {
    return this._hourValid;
  }

  dateSubmit() {
    let date = this.datePick.value.date;
    this._appointmentDataService.getAvailableHours$(
      this.hairdresser.id,
      date,
      this._bookedTreatmentDataService.bookedTreatments
    );
  }

  pickHour(hour: Date, $event) {
    let lastTarget = document.getElementById("selected");

    if (lastTarget) {
      lastTarget.removeAttribute("id");
    }

    let target = $event.target || $event.srcElement || $event.currentTarget;
    target.id = "selected";

    this._appointmentDataService.selectedHour = hour;
    this._hourValid = true;
  }

  submitAppointment() {
    this._appointmentDataService.bookAppointment(
      this.hairdresser.id,
      this.treatments,
      this.name.get("firstname").value,
      this.name.get("lastname").value
    );

    this._bookedTreatmentDataService.resetTreatments();
    this.router.navigate(["hairdresser/appointment/confirm"]);
  }

  getErrorMessage(errors: any): string {
    if (!errors) {
      return null;
    }
    if (errors.required) {
      return "verplicht";
    }
  }
}
