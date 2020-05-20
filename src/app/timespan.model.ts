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

  get allInMinutes(): number {
    return this._hours * 60 + this._minutes;
  }

  toJSON(): TimeSpanJson {
    return <TimeSpanJson>{
      hours: this._hours,
      minutes: this._minutes,
      seconds: this._seconds,
    };
  }

  static fromJSON(json: TimeSpanJson): TimeSpan {
    return new TimeSpan(json.hours, json.minutes, json.seconds);
  }
}
