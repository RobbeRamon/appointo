import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Hairdresser } from "src/app/hairdresser.model";
import { ActivatedRoute } from "@angular/router";
import { HairdresserSettingsDataService } from "../hairdresser-settings-data.service";

@Component({
  selector: "app-change-hairdresser",
  templateUrl: "./change-hairdresser.component.html",
  styleUrls: ["./change-hairdresser.component.scss"],
})
export class ChangeHairdresserComponent implements OnInit {
  public hairdresserForm: FormGroup;
  public hairdresser: Hairdresser;
  public message: string;

  constructor(
    private fb: FormBuilder,
    private hairdresserSettingsDataService: HairdresserSettingsDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(
      (item) => (this.hairdresser = item["hairdresser"])
    );

    this.hairdresserForm = this.fb.group({
      name: [this.hairdresser.name, [Validators.required]],
    });
  }

  onSubmit() {
    this.hairdresser.name = this.hairdresserForm.get("name").value;
    this.hairdresserSettingsDataService
      .changeHairdresser$(this.hairdresser)
      .subscribe((hairdresser: Hairdresser) => {
        this.hairdresser = hairdresser;
      });

    this.message = "De naam van je profiel is succesvol gewijzigd.";
  }

  getErrorMessage(errors: any): string {
    if (!errors) {
      return null;
    }
    if (errors.required) {
      return "verplicht";
    }
  }
}
