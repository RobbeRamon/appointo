import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Hairdresser } from "./hairdresser.model";
import { environment } from "src/environments/environment";
import { map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class HairdresserDataService {
  constructor(private http: HttpClient) {}

  get hairdressers$(): Observable<Hairdresser[]> {
    return this.http.get(`${environment.apiUrl}/hairdressers`).pipe(
      tap(console.log),
      map((list: any[]): Hairdresser[] => list.map(Hairdresser.fromJSON))
    );
  }

  getHairdresser$(id: string) {
    return this.http
      .get(`${environment.apiUrl}/recipes/${id}`)
      .pipe(map(Hairdresser.fromJSON));
  }
}
