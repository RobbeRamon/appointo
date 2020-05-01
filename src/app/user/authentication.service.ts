import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  constructor() {}

  login(email: string, password: string): Observable<boolean> {
    return null;
  }

  register(name: string, email: string, password: string): Observable<boolean> {
    return null;
  }

  logout() {}

  checkUsernameAvailability() {
    return null;
  }
}
