import { Component, OnInit } from "@angular/core";
import { Observable, EMPTY } from "rxjs";
import { Treatment } from "src/app/treatment.model";
import { Router } from "@angular/router";
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
  public warningMessage: string;
  private _treatment: Treatment;

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

  deleteTreatment(treatment: Treatment) {
    this._treatment = treatment;
    this.warningMessage = `Ben je zeker dat je ${treatment.name} (${treatment.categoryString}) wil verwijderen?`;
  }

  confirmDeleteTreatment() {
    this._hairdresserSettingsDataSerivce.deleteTreatment(this._treatment);
    this.warningMessage = "";
  }
}
