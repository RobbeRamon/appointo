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
  private _currentOpeningHours$ = new BehaviorSubject<Workday[]>([]);
  private _currentOpeningHours: Workday[];

  constructor(private http: HttpClient) {
    this.currentOpeningHours$
      .pipe(
        catchError((err) => {
          this._currentOpeningHours$.error(err);
          return throwError(err);
        })
      )
      .subscribe((workdays: Workday[]) => {
        this._currentOpeningHours = workdays;
        this._currentOpeningHours$.next(workdays);
      });
  }

  get allCurrentOpeningHours$() {
    return this._currentOpeningHours$;
  }

  get allCurrentOpeningHours() {
    return this._currentOpeningHours;
  }

  get currentOpeningHours$() {
    return this.http.get(`${environment.apiUrl}/manage/workdays`).pipe(
      catchError(this.handleError),
      map((list: any[]): Workday[] => list.map(Workday.fromJSON))
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
}
