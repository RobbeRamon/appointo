export interface TimeSpanJson {
  hours: number;
  minutes: number;
  seconds: number;
}

export class TimeSpan {
  constructor(
    private _hours: number,
    private _minutes: number,
    private _seconds: number
  ) {}

  get hours() {
    return this._hours;
  }

  get minutes() {
    return this._minutes;
  }

  get seconds() {
    return this._seconds;
  }

  static fromJSON(json: TimeSpanJson): TimeSpan {
    return new TimeSpan(json.hours, json.minutes, json.seconds);
  }
}
