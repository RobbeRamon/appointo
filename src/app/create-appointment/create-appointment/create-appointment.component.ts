import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BookedTreatmentDataService } from "src/app/booked-treatment-data.service";
import { Hairdresser } from "src/app/hairdresser.model";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { CreateAppointmentService } from "src/app/create-appointment.service";

@Component({
  selector: "app-create-appointment",
  templateUrl: "./create-appointment.component.html",
  styleUrls: ["./create-appointment.component.scss"],
})
export class CreateAppointmentComponent implements OnInit {
  public hairdresser: Hairdresser;
  public datePick: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private _bookedTreatmentDataService: BookedTreatmentDataService,
    private fb: FormBuilder,
    private _appointmentDataService: CreateAppointmentService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(
      (item) => (this.hairdresser = item["hairdresser"])
    );

    this.datePick = this.fb.group({
      date: [Validators.required],
    });
  }

  get treatments() {
    return this._bookedTreatmentDataService.bookedTreatments;
  }

  get hairdresserFromDataService() {
    return this._bookedTreatmentDataService.hairdresser;
  }

  dateSubmit() {
    let date = this.datePick.value.date;
    this._appointmentDataService.getAvailableHours$(
      this.hairdresser.id,
      date,
      this._bookedTreatmentDataService.bookedTreatments
    );
  }
}
