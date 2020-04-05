import { Component, OnInit, Input } from "@angular/core";
import { BookedTreatmentDataService } from "src/app/hairdresser-detail/booked-treatment-data.service";
import { Treatment } from "src/app/treatment.model";
import { Hairdresser } from "src/app/hairdresser.model";

@Component({
  selector: "app-treatment-added",
  templateUrl: "./treatment-added.component.html",
  styleUrls: ["./treatment-added.component.scss"],
})
export class TreatmentAddedComponent implements OnInit {
  @Input() public hairdresser: Hairdresser;
  private _treatments: Treatment[];

  constructor() {
    this._treatments = [];
  }

  ngOnInit(): void {}

  get treatments() {
    return this._treatments;
  }

  receiveAddedTreatment($event) {
    console.log($event);
    this._treatments = [...this._treatments, $event];
  }
}
