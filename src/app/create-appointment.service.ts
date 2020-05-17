import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";
import { Observable, throwError, BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { Treatment } from "./treatment.model";
import { Hairdresser } from "./hairdresser.model";

@Injectable({
  providedIn: "root",
})
export class CreateAppointmentService {
  private _hours: Date[];
  private _hours$ = new BehaviorSubject<Date[]>([]);
  private _selectedHour: Date;

  constructor(private http: HttpClient) {}

  get hours() {
    return this._hours;
  }

  get allAvailableHours() {
    return this._hours$;
  }

  set selectedHour(hour: Date) {
    this._selectedHour = hour;
  }

  getAvailableHours$(id: number, date: Date, treatments: Treatment[]): void {
    this.http
      .post(
        `${
          environment.apiUrl
        }/hairdressers/${id}/availabletimes?date=${date.toJSON()}`,
        treatments.map((tr) => tr.toJSON())
      )
      .pipe(catchError(this.handleError))
      .subscribe((data: string[]) => {
        let data2: Date[] = [];
        for (let date of data) {
          date = `"${date}"`;
          data2.push(JSON.parse(date));
        }

        this._hours = data2;
        this._hours$.next(this._hours);
      });
  }

  getAvailableHours2$(
    id: number,
    date: Date,
    treatments: Treatment[]
  ): Observable<Date[]> {
    return this.http
      .post(
        `${
          environment.apiUrl
        }/hairdressers/${id}/availabletimes?date=${date.toJSON()}`,
        treatments.map((tr) => tr.toJSON())
      )
      .pipe(
        catchError(this.handleError),
        map((data: string[]) => {
          let data2: Date[] = [];
          for (let date of data) {
            date = `"${date}"`;
            data2.push(JSON.parse(date));
          }

          return data2;
        })
      );
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

  bookAppointment(
    id: number,
    treatments: Treatment[],
    firstname: string,
    lastname: string
  ) {
    this.http
      .post(`${environment.apiUrl}/hairdressers/${id}/appointments`, {
        firstname: firstname,
        lastname: lastname,
        startMoment: this._selectedHour,
        treatments: treatments.map((tr) => tr.toJSON()),
      })
      .pipe(tap(console.log), catchError(this.handleError))
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      )
      .subscribe((appoinment) => {
        this._hours = [];
        this._hours$.next(this._hours);
        this._selectedHour = null;
      });
  }

  resetHours() {
    this._hours = [];
    this._hours$.next(this._hours);
  }
}
