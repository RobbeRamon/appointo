import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";

function validateTimeBlock(control: FormGroup): { [key: string]: any } {
  if (
    new Date(control.get("start").value).getTime() >=
    new Date(control.get("end").value).getTime()
  ) {
    return { hoursNotCorrect: true };
  }
  return null;
}

@Component({
  selector: "app-manage-workdays",
  templateUrl: "./manage-workdays.component.html",
  styleUrls: ["./manage-workdays.component.scss"],
})
export class ManageWorkdaysComponent implements OnInit {
  public days: FormGroup;
  public daysArrayNl = [
    "Maandag",
    "Dinsdag",
    "Woensdag",
    "Donderdag",
    "Vrijdag",
    "Zaterdag",
    "Zondag",
  ];
  public daysArrayEn = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.days = this.fb.group({
      monday: this.fb.array([]),
      tuesday: this.fb.array([]),
      wednesday: this.fb.array([]),
      thursday: this.fb.array([]),
      friday: this.fb.array([]),
      saturday: this.fb.array([]),
      sunday: this.fb.array([]),
    });
    // this.getHours(0).valueChanges.subscribe((hours) => {
    //   const lastElement = hours[hours.length - 1];
    //   if (lastElement.start && lastElement.end) {
    //     this.getHours(0).push(this.createTimeBlock());
    //   }
    // });
  }

  getHours(day: number): FormArray {
    return <FormArray>this.days.get(this.daysArrayEn[day]);
  }

  createTimeBlock(): FormGroup {
    return this.fb.group(
      {
        start: [""],
        end: [""],
      },
      { validator: validateTimeBlock }
    );
  }

  addWorkBlock(day: number) {
    this.getHours(day).push(this.createTimeBlock());
  }

  removeWorkBlock(day: number, block: number) {
    this.getHours(day).removeAt(block);
  }
}
