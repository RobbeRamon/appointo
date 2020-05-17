import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, BehaviorSubject, throwError } from "rxjs";
import { Hairdresser } from "./hairdresser.model";
import { environment } from "src/environments/environment";
import { map, tap, switchMap, catchError } from "rxjs/operators";
import { BookedTreatmentDataService } from "./booked-treatment-data.service";

@Injectable({
  providedIn: "root",
})
export class HairdresserDataService {
  private _reloadHairdressers = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient) {}

  get hairdressers$(): Observable<Hairdresser[]> {
    return this.http
      .get(`${environment.apiUrl}/hairdressers`)
      .pipe(
        map((list: any[]): Hairdresser[] => list.map(Hairdresser.fromJSON))
      );
  }

  getHairdressers$(name?: string) {
    return this._reloadHairdressers.pipe(
      switchMap(() => this.fetchHairdressers$(name))
    );
  }

  fetchHairdressers$(name?: string) {
    let params = new HttpParams();
    params = name ? params.append("name", name) : params;
    return this.http
      .get(`${environment.apiUrl}/hairdressers/`, { params })
      .pipe(
        catchError(this.handleError),
        map((list: any[]): Hairdresser[] => list.map(Hairdresser.fromJSON))
      );
  }

  getHairdresser$(id: number): Observable<Hairdresser> {
    return this.http
      .get(`${environment.apiUrl}/hairdressers/${id}`)
      .pipe(map(Hairdresser.fromJSON));
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
