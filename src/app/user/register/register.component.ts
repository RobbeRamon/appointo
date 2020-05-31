import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidationErrors,
  ValidatorFn,
  AbstractControl,
} from "@angular/forms";
import { AuthenticationService } from "../authentication.service";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  public register: FormGroup;
  public errorMessage: string;

  constructor(
    private authSerivce: AuthenticationService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.register = this.fb.group({
      name: ["", Validators.required],
      email: [
        "",
        [Validators.required, Validators.email],
        serverSideValidateUsername(this.authSerivce.checkUsernameAvailability),
      ],
      passwordGroup: this.fb.group(
        {
          password: [
            "",
            [
              Validators.required,
              Validators.minLength(8),
              patternValidator(/\d/, { hasNumber: true }),
              patternValidator(/[A-Z]/, { hasUpperCase: true }),
              patternValidator(/[a-z]/, { hasLowerCase: true }),
              patternValidator(/[^a-zA-Z0-9]/, { hasSpecialCharacter: true }),
            ],
          ],
          confirmPassword: ["", Validators.required],
        },
        { validator: comparePasswords }
      ),
    });
  }

  getErrorMessage(errors: any) {
    if (!errors) {
      return null;
    }
    if (errors.required) {
      return "verplicht";
    } else if (errors.minLength) {
      return `heeft minstends ${errors.minLength.requiredLength} karakters nodig (heeft er ${errors.minLength.actualLength})`;
    } else if (errors.hasNumber) {
      return `heeft minstends 1 nummer nodig`;
    } else if (errors.hasUpperCase) {
      return `heeft minstends 1 hoofdletter nodig`;
    } else if (errors.hasLowerCase) {
      return `heeft minstends 1 kleine letter nodig`;
    } else if (errors.hasSpecialCharacter) {
      return `heeft minstends 1 speciaal karakter nodig`;
    } else if (errors.userAlreadyExists) {
      return `gebruiker bestaat al`;
    } else if (errors.email) {
      return `het e-mail adres is niet geldig`;
    } else if (errors.passwordsDiffer) {
      return `de wachtwoorden komen niet overeen`;
    }
  }

  onSubmit() {
    this.authSerivce
      .register(
        this.register.value.name,
        this.register.value.email,
        this.register.value.passwordGroup.password
      )
      .subscribe(
        (val) => {
          if (val) {
            this.router.navigate(["/manage/settings"]);
          } else {
            this.errorMessage = `Registeren was niet mogelijk`;
          }
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            this.errorMessage = `Error bij het registeren van gebruiker ${this.register.value.email}: ${err.error.message}`;
          } else {
            this.errorMessage = `Error ${err.status} bij het registeren van gebruiker ${this.register.value.email}: ${err.error.message}`;
          }
        }
      );
  }
}

function patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    if (!control.value) {
      return null;
    }
    // test the value of the control against the regexp supplier
    const valid = regex.test(control.value);
    // if true, return no error (no error), else return passed in the second parameter
    return valid ? null : error;
  };
}

function comparePasswords(control: AbstractControl): { [key: string]: any } {
  const password = control.get("password");
  const confirmPassword = control.get("confirmPassword");
  return password.value === confirmPassword.value
    ? null
    : { passwordsDiffer: true };
}

function serverSideValidateUsername(
  checkAvailabilityFn: (n: string) => Observable<boolean>
): ValidatorFn {
  return (control: AbstractControl): Observable<{ [key: string]: any }> => {
    return checkAvailabilityFn(control.value).pipe(
      map((available) => {
        if (available) {
          return null;
        }
        return { userAlreadyExists: true };
      })
    );
  };
}
