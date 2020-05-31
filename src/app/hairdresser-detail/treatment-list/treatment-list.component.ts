import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Hairdresser } from "src/app/hairdresser.model";
import { Treatment } from "src/app/treatment.model";

@Component({
  selector: "app-treatment-list",
  templateUrl: "./treatment-list.component.html",
  styleUrls: ["./treatment-list.component.scss"],
})
export class TreatmentListComponent implements OnInit {
  @Input() public hairdresser: Hairdresser;
  @Output() public newTreatment = new EventEmitter<Treatment>();

  constructor() {}

  ngOnInit(): void {}

  bookTreatment(treatment: Treatment) {
    this.newTreatment.emit(treatment);
  }
}
