import { Component, OnInit } from "@angular/core";
import { Hairdresser } from "../hairdresser.model";
import { HairdresserDataService } from "../hairdresser-data.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-hairdresser-list",
  templateUrl: "./hairdresser-list.component.html",
  styleUrls: ["./hairdresser-list.component.scss"]
})
export class HairdresserListComponent implements OnInit {
  private _fetchHairdressers$: Observable<Hairdresser[]> = this
    ._hairdresserDataService.hairdressers$;

  constructor(private _hairdresserDataService: HairdresserDataService) {}

  ngOnInit(): void {}

  get hairdressers$(): Observable<Hairdresser[]> {
    return this._fetchHairdressers$;
  }
}
