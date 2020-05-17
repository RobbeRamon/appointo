import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { AuthenticationService } from "../authentication.service";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public login: FormGroup;
  public errorMessage: string;

  constructor(
    private authSerivce: AuthenticationService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.login = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  onSubmit() {
    this.authSerivce
      .login(this.login.value.email, this.login.value.password)
      .subscribe(
        (val) => {
          if (val) {
            if (this.authSerivce.redirectUrl) {
              this.router.navigateByUrl(this.authSerivce.redirectUrl);
              this.authSerivce.redirectUrl = "";
            } else {
              this.router.navigate(["/manage/calendar"]);
            }
          } else {
            this.errorMessage = "Inloggen niet mogelijk";
          }
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            this.errorMessage = `Kon de gebruiker niet inloggen met email ${this.login.value.email}`;
          } else {
            this.errorMessage = `Kon de gebruiker niet inloggen met email ${this.login.value.email}`;
          }
        }
      );
  }
}
