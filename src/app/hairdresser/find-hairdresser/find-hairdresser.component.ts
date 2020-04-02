import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-find-hairdresser",
  templateUrl: "./find-hairdresser.component.html",
  styleUrls: ["./find-hairdresser.component.scss"]
})
export class FindHairdresserComponent implements OnInit {
  public hairdresser: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.hairdresser = new FormGroup({
      name: new FormControl("Hairdresser")
    });
  }

  onSubmit() {
    console.log(this.hairdresser.value.name);
  }
}
