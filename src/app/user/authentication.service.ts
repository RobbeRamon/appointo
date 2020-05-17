import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  private readonly _tokenKey = "currentUser";
  private _user$: BehaviorSubject<string>;
  public redirectUrl: string = "";

  constructor(private http: HttpClient, private router: Router) {
    let parsedToken = parseJwt(this.tokenStorage);
    if (parsedToken) {
      const expires =
        new Date(parseInt(parsedToken.exp, 10) * 1000) < new Date();
      if (expires) {
        localStorage.removeItem(this._tokenKey);
        parsedToken = null;
      }
    }
    this._user$ = new BehaviorSubject<string>(
      parsedToken && parsedToken.unique_name
    );
  }

  set tokenStorage(token) {
    localStorage.setItem(this._tokenKey, token);
  }

  get tokenStorage() {
    const localToken = localStorage.getItem(this._tokenKey);
    return localToken ? localToken : "";
  }

  get user$() {
    return this._user$;
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
            this._user$.next(email);
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
            this._user$.next(email);
            return true;
          } else {
            return false;
          }
        })
      );
  }

  logout() {
    if (this._user$.getValue()) {
      localStorage.removeItem(this._tokenKey);
      this._user$.next(null);
    }

    this.router.navigate(["/"]);

    location.reload(true); // clear all the data that is stored in the browser
  }

  checkUsernameAvailability = (email: string): Observable<boolean> => {
    return this.http.get<boolean>(
      `${environment.apiUrl}/account/checkusername`,
      {
        params: { email },
      }
    );
  };
}

function parseJwt(token) {
  if (!token) {
    return null;
  }

  const base64Token = token.split(".")[1];
  const base64 = base64Token.replace(/-/g, "+").replace(/_/g, "/");
  return JSON.parse(window.atob(base64));
}
