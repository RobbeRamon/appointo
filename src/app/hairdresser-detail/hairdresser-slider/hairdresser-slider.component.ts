import { Component, OnInit, Input } from "@angular/core";
import { Hairdresser } from "src/app/hairdresser.model";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-hairdresser-slider",
  templateUrl: "./hairdresser-slider.component.html",
  styleUrls: ["./hairdresser-slider.component.scss"],
})
export class HairdresserSliderComponent implements OnInit {
  @Input() public hairdresser: Hairdresser;

  constructor() {}

  ngOnInit(): void {}

  createImagePath(path: string): string {
    return `${environment.fullApiUrl}/${path}`;
  }
}
