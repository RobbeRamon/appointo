import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { AppointmentDataService } from "./appointment-data.service";
import { Appointment } from "../appointment.model";

@Injectable({
  providedIn: "root",
})
export class AppointmentResolver implements Resolve<Appointment> {
  constructor(private appointmentDataService: AppointmentDataService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Appointment> {
    return this.appointmentDataService.getAppointment$(route.params["id"]);
  }
}
