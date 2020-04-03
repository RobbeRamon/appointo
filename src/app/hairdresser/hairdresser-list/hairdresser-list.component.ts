import { Component, OnInit } from "@angular/core";
import { Hairdresser } from "../hairdresser.model";
import { HairdresserDataService } from "../hairdresser-data.service";
import { Observable, EMPTY } from "rxjs";
import { catchError } from "rxjs/operators";

@Component({
  selector: "app-hairdresser-list",
  templateUrl: "./hairdresser-list.component.html",
  styleUrls: ["./hairdresser-list.component.scss"]
})
export class HairdresserListComponent implements OnInit {
  private _fetchHairdressers$: Observable<Hairdresser[]> = this
    ._hairdresserDataService.hairdressers$;
  public errorMessage: string;

  constructor(private _hairdresserDataService: HairdresserDataService) {}

  ngOnInit(): void {
    this._fetchHairdressers$ = this._hairdresserDataService.hairdressers$.pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );
  }

  get hairdressers$(): Observable<Hairdresser[]> {
    return this._fetchHairdressers$;
  }
}
