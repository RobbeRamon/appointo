import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { catchError, tap, map } from "rxjs/operators";
import { Workday } from "../workday.model";
import { Observable, throwError, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class HairdresserSettingsDataService {
  private _currentWorkdays$ = new BehaviorSubject<Workday[]>([]);
  private _currentWorkdays: Workday[];

  constructor(private http: HttpClient) {
    this.currentWorkdays$
      .pipe(
        catchError((err) => {
          this._currentWorkdays$.error(err);
          return throwError(err);
        })
      )
      .subscribe((workdays: Workday[]) => {
        this._currentWorkdays = workdays;
        this._currentWorkdays$.next(workdays);
      });
  }

  get allCurrentWorkdays$() {
    return this._currentWorkdays$;
  }

  get allCurrentWorkdays() {
    return this._currentWorkdays;
  }

  get currentWorkdays$() {
    return this.http.get(`${environment.apiUrl}/manage/workdays`).pipe(
      catchError(this.handleError),
      map((list: any[]): Workday[] => list.map(Workday.fromJSON))
    );
  }

  changeWorkdays(workdays: Workday[]) {
    console.log(JSON.stringify(workdays.map((wd) => wd.toJSON())));
    this.http
      .post(
        `${environment.apiUrl}/manage/workdays`,
        workdays.map((wd) => wd.toJSON())
      )
      .pipe(catchError(this.handleError))
      .subscribe((workdays: Workday[]) => {
        // this._currentWorkdays = workdays;
        // this._currentWorkdays$.next(workdays);
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
