import { Time, TimeJson } from "./time.model";

export interface TimeRangeJson {
  startTime: TimeJson;
  endTime: TimeJson;
}

export class TimeRange {
  constructor(private _startTime: Time, private _endTime: Time) {}

  get startTime() {
    return this._startTime;
  }

  get endTime() {
    return this._endTime;
  }

  toJSON(): TimeRangeJson {
    return <TimeRangeJson>{
      startTime: this.startTime.toJSON(),
      endTime: this.endTime.toJSON(),
    };
  }

  static fromJSON(json: TimeRangeJson) {
    return new TimeRange(
      Time.fromJSON(json.startTime),
      Time.fromJSON(json.endTime)
    );
  }
}
