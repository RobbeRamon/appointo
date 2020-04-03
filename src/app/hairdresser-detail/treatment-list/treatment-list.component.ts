import { Component, OnInit, Input } from "@angular/core";
import { Hairdresser } from "src/app/hairdresser.model";

@Component({
  selector: "app-treatment-list",
  templateUrl: "./treatment-list.component.html",
  styleUrls: ["./treatment-list.component.scss"],
})
export class TreatmentListComponent implements OnInit {
  @Input() hairdresser: Hairdresser;

  constructor() {}

  ngOnInit(): void {}
}
