import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  private readonly _tokenKey = "currentUser";
  constructor(private http: HttpClient) {}

  set tokenStorage(token) {
    localStorage.setItem(this._tokenKey, token);
  }

  get tokenStorage() {
    const localToken = localStorage.getItem(this._tokenKey);
    return localToken ? localToken : "";
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http
      .post(
        `${environment.apiUrl}/account`,
        { email, password },
        { responseType: "text" }
      )
      .pipe(
        map((token: any) => {
          if (token) {
            this.tokenStorage = token;
            return true;
          } else {
            return false;
          }
        })
      );
  }

  register(name: string, email: string, password: string): Observable<boolean> {
    return this.http
      .post(
        `${environment.apiUrl}/account/register`,
        {
          name,
          email,
          password,
          passwordConfirmation: password,
        },
        { responseType: "text" }
      )
      .pipe(
        map((token: any) => {
          if (token) {
            this.tokenStorage = token;
            return true;
          } else {
            return false;
          }
        })
      );
  }

  logout() {}

  checkUsernameAvailability = (email: string): Observable<boolean> => {
    return this.http.get<boolean>(
      `${environment.apiUrl}/account/checkusername`,
      {
        params: { email },
      }
    );
  };
}
