import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { Observable, throwError, BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { Treatment } from "./treatment.model";

@Injectable({
  providedIn: "root",
})
export class CreateAppointmentService {
  private _hours: Date[] = [];

  constructor(private http: HttpClient) {}

  get hours() {
    return this._hours;
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
      });
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
