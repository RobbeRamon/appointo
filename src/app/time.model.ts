export interface TimeJson {
  hour: number;
  minute: number;
  second: number;
}

export class Time {
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

  static fromJSON(json: TimeJson) {
    return new Time(json.hour, json.minute, json.second);
  }
}
