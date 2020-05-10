import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { Treatment } from "../treatment.model";
import { HairdresserSettingsDataService } from "./hairdresser-settings-data.service";

@Injectable({
  providedIn: "root",
})
export class TreatmentResolver implements Resolve<Treatment> {
  constructor(
    private hairdresserSettingsDataService: HairdresserSettingsDataService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Treatment> {
    return this.hairdresserSettingsDataService.getTreatment$(
      route.params["id"]
    );
  }
}
