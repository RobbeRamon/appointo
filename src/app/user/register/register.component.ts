import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
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
      return "is requried";
    } else if (errors.minLength) {
      return `needs at least ${errors.minLength.requiredLength} characters (got ${errors.minLength.actualLength})`;
    } else if (errors.hasNumber) {
      return `needs at least 1 number`;
    } else if (errors.hasUpperCase) {
      return `needs at least 1 uppercase`;
    } else if (errors.hasLowerCase) {
      return `needs at least 1 lower case letter`;
    } else if (errors.hasSpecialCharacter) {
      return `needs at least 1 special character`;
    } else if (errors.userAlreadyExists) {
      return `user already exists`;
    } else if (errors.email) {
      return `not a valid email address`;
    } else if (errors.passwordsDiffer) {
      return `passwords are not the same`;
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
            // TODO: navigate to admin panel using this.router.navigate(["/admin"])
            this.router.navigate([""]);
          } else {
            this.errorMessage = `Could not register`;
          }
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            this.errorMessage = `Error while trying to register user ${this.register.value.email}: ${err.error.message}`;
          } else {
            this.errorMessage = `Error ${err.status} while trying to register user ${this.register.value.email}: ${err.error.message}`;
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
