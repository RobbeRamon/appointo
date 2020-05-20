import { Component, OnInit, Input } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { HairdresserSettingsDataService } from "../hairdresser-settings-data.service";
import { Treatment } from "src/app/treatment.model";
import { ActivatedRoute, Router } from "@angular/router";
import { TimeSpan } from "src/app/timespan.model";

function minPrice(control: AbstractControl): { [key: string]: any } {
  const price = control.get("price");
  return price.value >= 0 ? null : { priceMoreThanZero: true };
}

function minDuration(control: AbstractControl): { [key: string]: any } {
  const hours = control.get("hours");
  const minutes = control.get("minutes");
  const seconds = control.get("seconds");

  return hours.value == 0 && minutes.value == 0 && seconds.value == 0
    ? null
    : { wrongDuration: true };
}

@Component({
  selector: "app-edit-treatment",
  templateUrl: "./edit-treatment.component.html",
  styleUrls: ["./edit-treatment.component.scss"],
})
export class EditTreatmentComponent implements OnInit {
  public treatmentForm: FormGroup;
  @Input() public treatment: Treatment;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private _hairdresserSettingsDataService: HairdresserSettingsDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.treatment) {
      this.route.data.subscribe((item) => (this.treatment = item["treatment"]));
    }

    this.treatmentForm = this.fb.group(
      {
        name: [
          this.treatment.name,
          [Validators.required, Validators.minLength(2)],
        ],
        category: [this.treatment.category, [Validators.required]],
        price: [this.treatment.price, [Validators.required]],
        hours: [this.treatment.duration.hours, [Validators.required]],
        minutes: [this.treatment.duration.minutes, [Validators.required]],
        seconds: [this.treatment.duration.seconds, [Validators.required]],
      },
      { validator: minPrice, minDuration }
    );
  }

  onSubmit() {
    this.treatment.name = this.treatmentForm.get("name").value;
    this.treatment.price = this.treatmentForm.get("price").value;
    this.treatment.category = this.treatmentForm.get("category").value;
    this.treatment.duration = new TimeSpan(
      this.treatmentForm.get("hours").value,
      this.treatmentForm.get("minutes").value,
      this.treatmentForm.get("seconds").value
    );
    if (this.treatment.id != 0) {
      this._hairdresserSettingsDataService.changeTreatment(this.treatment);
    } else {
      this._hairdresserSettingsDataService.createTreatment(this.treatment);
    }

    this.router.navigate(["/manage/treatments"]);
  }

  getErrorMessage(errors: any): string {
    if (!errors) {
      return null;
    }
    if (errors.required) {
      return "verplicht";
    } else if (errors.minlength) {
      return `minstends ${errors.minlength.requiredLength} karaters nodig (heeft er ${errors.minlength.actualLength})`;
    } else if (errors.minPrice) {
      return "prijs mag niet kleiner zijn dan 0";
    } else if (errors.wrongDuration) {
      return "totale duur moet groter zijn dan 0";
    }
  }
}
