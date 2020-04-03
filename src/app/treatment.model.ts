export interface TreatmentJson {
  id: number;
  name: string;
  duration: string;
}

export class Treatment {
  constructor(
    private _id: number,
    private _name: string,
    private _duration: string
  ) {}

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get duration() {
    return this._duration;
  }

  static fromJSON(json: TreatmentJson): Treatment {
    const treatment = new Treatment(json.id, json.name, json.duration);

    return treatment;
  }
}
