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

  constructor(private _bookedTreatmentDataService: BookedTreatmentDataService) {
    this._treatments = [];
  }

  ngOnInit(): void {}

  get treatments() {
    return this._treatments;
  }

  totalPrice(): number {
    return 15;
  }

  receiveAddedTreatment($event) {
    let treatment: Treatment = this._treatments.filter(tr => tr.id == $event.id)[0];

    if (treatment){
      treatment.amount++;
    } else {
      $event.amount = 1;
      this._treatments = [...this._treatments, $event];
    }  
    
    this._bookedTreatmentDataService.bookTreatment($event);
  }

  confirmTreatments() {
    this._bookedTreatmentDataService.bookTreatments(this._treatments);
  }
}
