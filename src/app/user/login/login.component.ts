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
      .login(this.login.value.name, this.login.value.password)
      .subscribe(
        (val) => {
          if (val) {
            // TODO: navigate to admin panel using this.router.navigate(["/admin"])
          } else {
            this.errorMessage = "Kon niet inloggen";
          }
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            this.errorMessage = `Error bij het inloggen van gebruiker ${this.login.value.email}: ${err.error.message}`;
          } else {
            this.errorMessage = `Erro ${err.status} bij het inloggen van gebruiker ${this.login.value.email}: ${err.error.message}`;
          }
        }
      );
  }
}
