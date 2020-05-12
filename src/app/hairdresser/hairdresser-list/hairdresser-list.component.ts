import { Component, OnInit } from "@angular/core";
import { Observable, EMPTY, Subject, BehaviorSubject } from "rxjs";
import {
  catchError,
  distinctUntilChanged,
  debounceTime,
  switchMap,
} from "rxjs/operators";
import { Hairdresser } from "src/app/hairdresser.model";
import { HairdresserDataService } from "src/app/hairdresser-data.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-hairdresser-list",
  templateUrl: "./hairdresser-list.component.html",
  styleUrls: ["./hairdresser-list.component.scss"],
})
export class HairdresserListComponent implements OnInit {
  public filterHairdresserName: string = "";
  public errorMessage: string;
  public filterHairdresser$ = new Subject<string>();

  private _fetchHairdressers$: Observable<Hairdresser[]>;

  constructor(
    private _hairdresserDataService: HairdresserDataService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.filterHairdresser$
      .pipe(distinctUntilChanged(), debounceTime(250))
      .subscribe((val) => {
        const params = val ? { queryParams: { filter: val } } : undefined;
        this._router.navigate(["/hairdresser/list"], params);
      });

    this._fetchHairdressers$ = this._route.queryParams
      .pipe(
        switchMap((newParams) => {
          if (newParams["filter"]) {
            this.filterHairdresserName = newParams["filter"];
          }

          return this._hairdresserDataService.getHairdressers$(
            newParams["filter"]
          );
        })
      )
      .pipe(
        catchError((err) => {
          this.errorMessage = err;
          return EMPTY;
        })
      );
  }

  ngOnInit(): void {}

  applyFilter(filter: string) {
    this.filterHairdresserName = filter;
  }

  get hairdressers$(): Observable<Hairdresser[]> {
    return this._fetchHairdressers$;
  }
}
