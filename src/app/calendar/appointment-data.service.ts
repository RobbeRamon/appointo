import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Appointment } from "../appointment.model";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import * as SignalR from "@aspnet/signalr";

@Injectable({
  providedIn: "root",
})
export class AppointmentDataService {
  private _appointments;
  private _appointments$ = new BehaviorSubject<Appointment[]>([]);
  private _hubConnection: SignalR.HubConnection;

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

  fetchAppointments() {
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

  startConnection() {
    this._hubConnection = new SignalR.HubConnectionBuilder()
      .withUrl("https://localhost:5001/appointments")
      .build();

    this._hubConnection
      .start()
      .then(() => console.log("Connection started"))
      .catch((err) => console.log("Error while starting connection: " + err));
  }

  addAppointmentsListener() {
    this._hubConnection.on("appointments", (data) => {
      this.fetchAppointments();
    });
  }
}
