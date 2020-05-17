import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";
import { HairdresserSettingsDataService } from "../hairdresser-settings-data.service";
import { Observable, EMPTY } from "rxjs";
import { Workday } from "src/app/workday.model";
import { catchError } from "rxjs/operators";
import { TimeRange } from "src/app/timerange.model";
import { Time } from "src/app/time.model";

function validateTimeBlock(control: FormGroup): { [key: string]: any } {
  if (
    control.get("start").value.substring(0, 2) >=
    control.get("end").value.substring(0, 2)
  ) {
    if (
      control.get("start").value.substring(3, 5) >=
      control.get("end").value.substring(3, 5)
    ) {
      return { hoursNotCorrect: true };
    }
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
    "Zondag",
    "Maandag",
    "Dinsdag",
    "Woensdag",
    "Donderdag",
    "Vrijdag",
    "Zaterdag",
  ];
  public daysArrayEn = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  private _fetchWorkdays$: Observable<Workday[]>;
  public errorMessage: string;
  public message: string;

  constructor(
    private fb: FormBuilder,
    private _hairdresserSettingsData: HairdresserSettingsDataService
  ) {}

  ngOnInit(): void {
    // this.days = this.fb.group({
    //   sunday: this.fb.array([]),
    //   monday: this.fb.array([]),
    //   tuesday: this.fb.array([]),
    //   wednesday: this.fb.array([]),
    //   thursday: this.fb.array([]),
    //   friday: this.fb.array([]),
    //   saturday: this.fb.array([]),
    // });
    // this.getHours(0).valueChanges.subscribe((hours) => {
    //   const lastElement = hours[hours.length - 1];
    //   if (lastElement.start && lastElement.end) {
    //     this.getHours(0).push(this.createTimeBlock());
    //   }
    // });

    this._fetchWorkdays$ = this._hairdresserSettingsData.allCurrentWorkdays$.pipe(
      catchError((err) => {
        this.errorMessage = err;
        return EMPTY;
      })
    );

    this.workDays$.subscribe((workdays) => {
      this.createCleanForm();
      for (let workday of workdays) {
        for (let timeBlock of workday.hours) {
          this.addWorkBlockWithTime(workday.dayId, timeBlock);
        }
      }
    });
  }

  get workDays$() {
    return this._fetchWorkdays$;
  }

  createCleanForm() {
    this.days = this.fb.group({
      sunday: this.fb.array([]),
      monday: this.fb.array([]),
      tuesday: this.fb.array([]),
      wednesday: this.fb.array([]),
      thursday: this.fb.array([]),
      friday: this.fb.array([]),
      saturday: this.fb.array([]),
    });
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

  createTimeBlockWithTime(hour: TimeRange): FormGroup {
    let startHours: string =
      hour.startTime.hours < 10
        ? `0${hour.startTime.hours}`
        : `${hour.startTime.hours}`;
    let startMinutes: string =
      hour.startTime.minutes < 10
        ? `0${hour.startTime.minutes}`
        : `${hour.startTime.minutes}`;
    let endHours: string =
      hour.endTime.hours < 10
        ? `0${hour.endTime.hours}`
        : `${hour.endTime.hours}`;
    let endMinutes: string =
      hour.endTime.minutes < 10
        ? `0${hour.endTime.minutes}`
        : `${hour.endTime.minutes}`;

    return this.fb.group(
      {
        start: [`${startHours}:${startMinutes}`],
        end: [`${endHours}:${endMinutes}`],
      },
      { validator: validateTimeBlock }
    );
  }

  addWorkBlock(day: number) {
    this.getHours(day).push(this.createTimeBlock());
  }

  addWorkBlockWithTime(day: number, hour: TimeRange) {
    this.getHours(day).push(this.createTimeBlockWithTime(hour));
  }

  removeWorkBlock(day: number, block: number) {
    this.getHours(day).removeAt(block);
  }

  onSubmit() {
    let workdays: Workday[] = [];
    let counter: number = 0;

    for (let day in this.days.value) {
      if (this.days.value[day].length < 1) {
        workdays.push(new Workday(counter, []));
      } else {
        let timeRanges: TimeRange[] = [];

        for (let hour of this.days.value[day]) {
          let hourArrayStart: number[] = hour.start.split(":");
          let hourArrayEnd: number[] = hour.end.split(":");

          let startTime: Time = new Time(
            Number(hourArrayStart[0]),
            Number(hourArrayStart[1]),
            0
          );
          let endTime: Time = new Time(
            Number(hourArrayEnd[0]),
            Number(hourArrayEnd[1]),
            0
          );

          timeRanges.push(new TimeRange(startTime, endTime));
        }

        workdays.push(new Workday(counter, timeRanges));
      }

      counter++;
    }

    this._hairdresserSettingsData.changeWorkdays(workdays);

    this.message = "De wijzigingen zijn doorgevoerd";
  }

  getErrorMessage(errors: any): string {
    if (!errors) {
      return null;
    }
    if (errors.hoursNotCorrect) {
      return "Een einduur mag niet voor een beginuur komen";
    }
  }
}
