import { Component, OnInit } from "@angular/core";
import { Treatment } from "src/app/treatment.model";
import { TimeSpan } from "src/app/timespan.model";

@Component({
  selector: "app-create-treatment",
  templateUrl: "./create-treatment.component.html",
  styleUrls: ["./create-treatment.component.scss"],
})
export class CreateTreatmentComponent implements OnInit {
  public treatment: Treatment;

  constructor() {}

  ngOnInit(): void {
    this.treatment = new Treatment(0, "", new TimeSpan(0, 0, 0), 0, 0);
  }
}
