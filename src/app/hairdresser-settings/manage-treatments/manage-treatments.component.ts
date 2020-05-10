import { Component, OnInit } from "@angular/core";
import { Observable, EMPTY } from "rxjs";
import { Treatment } from "src/app/treatment.model";
import { ActivatedRoute, Router } from "@angular/router";
import { HairdresserDataService } from "src/app/hairdresser-data.service";
import { HairdresserSettingsDataService } from "../hairdresser-settings-data.service";
import { catchError } from "rxjs/operators";

@Component({
  selector: "app-manage-treatments",
  templateUrl: "./manage-treatments.component.html",
  styleUrls: ["./manage-treatments.component.scss"],
})
export class ManageTreatmentsComponent implements OnInit {
  private _fetchTreatments$: Observable<Treatment[]>;
  public errorMessage: string;

  constructor(
    private _hairdresserSettingsDataSerivce: HairdresserSettingsDataService,
    private _router: Router
  ) {
    this._fetchTreatments$ = _hairdresserSettingsDataSerivce.allCurrentTreatments$.pipe(
      catchError((err) => {
        this.errorMessage = err;
        return EMPTY;
      })
    );
  }

  ngOnInit(): void {}

  get treatments$() {
    return this._fetchTreatments$;
  }

  giveCategoryString(id: number) {
    switch (id) {
      case 0:
        return "Man";
      case 1:
        return "Vrouw";
      case 2:
        return "Kinderen";
      default:
        return "";
    }
  }
}
