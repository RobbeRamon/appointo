import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Hairdresser } from "src/app/hairdresser.model";
import { BookedTreatmentDataService } from "src/app/booked-treatment-data.service";

@Component({
  selector: "app-hairdresser-detail",
  templateUrl: "./hairdresser-detail.component.html",
  styleUrls: ["./hairdresser-detail.component.scss"],
})
export class HairdresserDetailComponent implements OnInit {
  public hairdresser: Hairdresser;

  constructor(
    private route: ActivatedRoute,
    private _bookedTreatmentDataServce: BookedTreatmentDataService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(
      (item) => (this.hairdresser = item["hairdresser"])
    );
    this._bookedTreatmentDataServce.resetTreatments();
  }
}
