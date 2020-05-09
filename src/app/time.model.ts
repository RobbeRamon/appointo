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

  get hours(): number {
    return this._hours;
  }

  get minutes(): number {
    return this._minutes;
  }

  get seconds(): number {
    return this._seconds;
  }

  toJSON(): TimeJson {
    return <TimeJson>{
      hour: this.hours,
      minute: this.minutes,
      second: this.seconds,
    };
  }

  static fromJSON(json: TimeJson) {
    return new Time(json.hour, json.minute, json.second);
  }
}
