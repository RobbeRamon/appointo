import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-find-hairdresser",
  templateUrl: "./find-hairdresser.component.html",
  styleUrls: ["./find-hairdresser.component.scss"],
})
export class FindHairdresserComponent implements OnInit {
  public hairdresser: FormGroup;

  constructor(private _router: Router) {}

  ngOnInit(): void {
    this.hairdresser = new FormGroup({
      name: new FormControl(""),
    });
  }

  onSubmit() {
    const val = this.hairdresser.value.name;
    const params = val ? { queryParams: { filter: val } } : undefined;
    this._router.navigate(["/hairdresser/list"], params);
  }
}
