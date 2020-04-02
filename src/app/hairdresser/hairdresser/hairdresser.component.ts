import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-hairdresser",
  templateUrl: "./hairdresser.component.html",
  styleUrls: ["./hairdresser.component.scss"]
})
export class HairdresserComponent implements OnInit {
  @Input() name: string;

  constructor() {}

  ngOnInit(): void {}
}
