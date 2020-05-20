import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { catchError, tap, map } from "rxjs/operators";
import { Workday, WorkdayJson } from "../workday.model";
import { Observable, throwError, BehaviorSubject } from "rxjs";
import { Treatment, TreatmentJson } from "../treatment.model";
import { Hairdresser } from "../hairdresser.model";

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

  get loggedInHairdresser$() {
    return this.http
      .get(`${environment.apiUrl}/hairdressers/loggedinuser`)
      .pipe(catchError(this.handleError), map(Hairdresser.fromJSON));
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
      .pipe(catchError(this.handleError), map(Treatment.fromJSON));
  }

  changeWorkdays(workdays: Workday[]) {
    this.http
      .post(
        `${environment.apiUrl}/manage/workdays`,
        workdays.map((wd) => wd.toJSON())
      )
      .pipe(catchError(this.handleError))
      .subscribe((workdays: WorkdayJson[]) => {
        this._currentWorkdays = workdays.map((wd) => Workday.fromJSON(wd));
        this._currentWorkdays$.next(this._currentWorkdays);
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

        if (index > -1) {
          this._currentTreatments[index] = treatment;
        }

        this._currentTreatments$.next(this._currentTreatments);
      });
  }

  createTreatment(treatment: Treatment) {
    this.http
      .post(`${environment.apiUrl}/manage/treatments/`, treatment.toFullJSON())
      .pipe(catchError(this.handleError))
      .subscribe((treatment: TreatmentJson) => {
        this._currentTreatments.push(Treatment.fromJSON(treatment));
        this._currentTreatments$.next(this._currentTreatments);
      });
  }

  deleteTreatment(treatment: Treatment) {
    this.http
      .delete(`${environment.apiUrl}/manage/treatments/${treatment.id}`)
      .pipe(catchError(this.handleError))
      .subscribe(() => {
        let treatment2 = this._currentTreatments.find(
          (tr) => tr.id === treatment.id
        );
        let index = this._currentTreatments.indexOf(treatment2);

        if (index > -1) {
          this._currentTreatments.splice(index, 1);
        }

        this._currentTreatments$.next(this._currentTreatments);
      });
  }

  changeHairdresser$(hairdresser: Hairdresser) {
    return this.http
      .put(`${environment.apiUrl}/manage/hairdressers`, hairdresser)
      .pipe(catchError(this.handleError), map(Hairdresser.fromJSON));
  }

  handleError(err: any): Observable<never> {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else if (err instanceof HttpErrorResponse) {
      errorMessage = `'${err.status} ${err.statusText}' when accessing '${err.url}'`;
    } else {
      errorMessage = err;
    }
    return throwError(errorMessage);
  }
}
