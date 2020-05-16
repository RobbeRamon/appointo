import { Component, OnInit, Input } from "@angular/core";
import { Hairdresser } from "../../hairdresser.model";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-hairdresser",
  templateUrl: "./hairdresser.component.html",
  styleUrls: ["./hairdresser.component.scss"],
})
export class HairdresserComponent implements OnInit {
  @Input() public hairdresser: Hairdresser;

  constructor() {}

  ngOnInit(): void {}

  createImagePath(path: string): string {
    return `${environment.fullApiUrl}/${path}`;
  }
}
