import { Component, OnInit, Input } from "@angular/core";
import { BookedTreatmentDataService } from "src/app/booked-treatment-data.service";
import { Treatment } from "src/app/treatment.model";
import { Hairdresser } from "src/app/hairdresser.model";

@Component({
  selector: "app-treatment-added",
  templateUrl: "./treatment-added.component.html",
  styleUrls: ["./treatment-added.component.scss"],
})
export class TreatmentAddedComponent implements OnInit {
  @Input() public hairdresser: Hairdresser;

  constructor(private _bookedTreatmentDataService: BookedTreatmentDataService) {
  }

  ngOnInit(): void {}

  get treatments() {
    return this._bookedTreatmentDataService.bookedTreatments;
  }

  totalPrice(): number {
    return 15;
  }

  receiveAddedTreatment($event) {
    let treatment: Treatment = this._bookedTreatmentDataService.bookedTreatments.filter(tr => tr.id == $event.id)[0];

    if (treatment){
      treatment.amount++;
    } else {
      $event.amount = 1;
      this._bookedTreatmentDataService.bookTreatment($event);
    }  
  }
}
