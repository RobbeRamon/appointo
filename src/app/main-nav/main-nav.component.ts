import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../user/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-main-nav",
  templateUrl: "./main-nav.component.html",
  styleUrls: ["./main-nav.component.scss"],
})
export class MainNavComponent implements OnInit {
  public loggedInUser$ = this._authenticationService.user$;
  constructor(
    private _authenticationService: AuthenticationService,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    this._router.navigate(["/login"]);
  }

  logout() {
    this._authenticationService.logout();
  }
}
