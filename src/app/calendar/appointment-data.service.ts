import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Appointment } from "../appointment.model";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AppointmentDataService {
  private _appointments;
  private _appointments$ = new BehaviorSubject<Appointment[]>([]);

  constructor(private http: HttpClient) {
    this.appointments$
      .pipe(
        catchError((err) => {
          this._appointments$.error(err);
          return throwError(err);
        })
      )
      .subscribe((appointments: Appointment[]) => {
        this._appointments = appointments;
        this._appointments$.next(this._appointments);
      });
  }

  get appointments$(): Observable<Appointment[]> {
    return this.http.get(`${environment.apiUrl}/manage/appointments`).pipe(
      catchError(this.handleError),
      map((list: any[]): Appointment[] => list.map(Appointment.fromJSON))
    );
  }

  get allAppointemnts$(): Observable<Appointment[]> {
    return this._appointments$;
  }

  handleError(err: any): Observable<never> {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else if (err instanceof HttpErrorResponse) {
      console.log(err);
      errorMessage = `'${err.status} ${err.statusText}' when accessing '${err.url}'`;
    } else {
      errorMessage = err;
    }
    return throwError(errorMessage);
  }
}
