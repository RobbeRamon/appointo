import { Injectable } from "@angular/core";
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from "@angular/router";
import { Hairdresser } from "../hairdresser.model";
import { HairdresserDataService } from "../hairdresser-data.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class HairdresserResolver implements Resolve<Hairdresser> {
  constructor(private recipeService: HairdresserDataService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Hairdresser> {
    return this.recipeService.getHairdresser$(route.params["id"]);
  }
}
