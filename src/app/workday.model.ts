import { TimeRange, TimeRangeJson } from "./timerange.model";

export interface WorkdayJson {
  dayId: number;
  hours: TimeRangeJson[];
}

export class Workday {
  constructor(private _dayId: number, private _hours: TimeRange[]) {}

  get dayId() {
    return this._dayId;
  }

  get hours() {
    return this._hours;
  }

  toJSON(): WorkdayJson {
    return <WorkdayJson>{
      dayId: this.dayId,
      hours: this.hours.map((value) => value.toJSON()),
    };
  }

  static fromJSON(json: WorkdayJson): Workday {
    const workday = new Workday(json.dayId, json.hours.map(TimeRange.fromJSON));
    return workday;
  }
}
