import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HairdresserDataService } from "src/app/hairdresser-data.service";
import { Hairdresser } from "src/app/hairdresser.model";

@Component({
  selector: "app-hairdresser-detail",
  templateUrl: "./hairdresser-detail.component.html",
  styleUrls: ["./hairdresser-detail.component.scss"]
})
export class HairdresserDetailComponent implements OnInit {
  public hairdresser: Hairdresser;

  constructor(
    private route: ActivatedRoute,
    private hairdresserDateService: HairdresserDataService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.hairdresserDateService
      .getHairdresser$(id)
      .subscribe(item => (this.hairdresser = item));
  }
}
