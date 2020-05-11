import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { HairdresserSettingsDataService } from "../hairdresser-settings-data.service";
import { Treatment } from "src/app/treatment.model";
import { ActivatedRoute, Router } from "@angular/router";

function minPrice(control: AbstractControl): { [key: string]: any } {
  const price = control.get("price");
  return price.value >= 0 ? null : { priceLessThanZero: true };
}

@Component({
  selector: "app-edit-treatment",
  templateUrl: "./edit-treatment.component.html",
  styleUrls: ["./edit-treatment.component.scss"],
})
export class EditTreatmentComponent implements OnInit {
  public treatmentForm: FormGroup;
  public treatment: Treatment;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private _haridresserSettingsDataService: HairdresserSettingsDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((item) => (this.treatment = item["treatment"]));
    console.log(this.treatment);

    this.treatmentForm = this.fb.group(
      {
        name: [
          this.treatment.name,
          [Validators.required, Validators.minLength(2)],
        ],
        category: [this.treatment.category, [Validators.required]],
        price: [this.treatment.price, [Validators.required]],
      },
      { validator: minPrice }
    );

    console.log(this.treatment.duration);
  }

  onSubmit() {
    this.treatment.name = this.treatmentForm.get("name").value;
    this.treatment.price = this.treatmentForm.get("price").value;
    this.treatment.category = this.treatmentForm.get("category").value;
    this._haridresserSettingsDataService.changeTreatment(this.treatment);
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
    }
  }
}
