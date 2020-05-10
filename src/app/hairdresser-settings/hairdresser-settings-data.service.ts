import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { catchError, tap, map } from "rxjs/operators";
import { Workday } from "../workday.model";
import { Observable, throwError, BehaviorSubject } from "rxjs";
import { Treatment } from "../treatment.model";

@Injectable({
  providedIn: "root",
})
export class HairdresserSettingsDataService {
  private _currentWorkdays$ = new BehaviorSubject<Workday[]>([]);
  private _currentWorkdays: Workday[];
  private _currentTreatments: Treatment[];
  private _currentTreatments$ = new BehaviorSubject<Treatment[]>([]);

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

    this.currentTreatments$
      .pipe(
        catchError((err) => {
          this._currentTreatments$.error(err);
          return throwError(err);
        })
      )
      .subscribe((treatments: Treatment[]) => {
        this._currentTreatments = treatments;
        this._currentTreatments$.next(treatments);
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

  get allCurrentTreatments$() {
    return this._currentTreatments$;
  }

  get allCurrentTreatments() {
    return this._currentTreatments;
  }

  get currentTreatments$() {
    return this.http.get(`${environment.apiUrl}/hairdressers/treatments`).pipe(
      catchError(this.handleError),
      map((list: any[]): Treatment[] => list.map(Treatment.fromJSON))
    );
  }

  getTreatment$(id: number): Observable<Treatment> {
    return this.http
      .get(`${environment.apiUrl}/hairdressers/treatments/${id}`)
      .pipe(map(Treatment.fromJSON));
  }

  changeWorkdays(workdays: Workday[]) {
    //console.log(JSON.stringify(workdays.map((wd) => wd.toJSON())));
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

  changeTreatment(treatment: Treatment) {
    this.http
      .put(
        `${environment.apiUrl}/manage/treatments/${treatment.id}`,
        treatment.toFullJSON()
      )
      .pipe(catchError(this.handleError))
      .subscribe(() => {
        let treatment2 = this._currentTreatments.find(
          (tr) => tr.id === treatment.id
        );
        let index = this._currentTreatments.indexOf(treatment2);

        if (index !== -1) {
          this._currentTreatments[index] = treatment;
        }

        this._currentTreatments$.next(this._currentTreatments);
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
