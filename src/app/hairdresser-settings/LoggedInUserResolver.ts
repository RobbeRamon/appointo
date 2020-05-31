import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { HairdresserSettingsDataService } from "./hairdresser-settings-data.service";
import { Hairdresser } from "../hairdresser.model";

@Injectable({
  providedIn: "root",
})
export class LoggedInUserResolver implements Resolve<Hairdresser> {
  constructor(
    private hairdresserSettingsDataService: HairdresserSettingsDataService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Hairdresser> {
    return this.hairdresserSettingsDataService.loggedInHairdresser$;
  }
}
