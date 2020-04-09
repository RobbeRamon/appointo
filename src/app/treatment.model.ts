export interface TreatmentJson {
  id: number;
  name: string;
  duration: string;
}

export class Treatment {
  private _amount: number;

  constructor(
    private _id: number,
    private _name: string,
    private _duration: string
  ) {
    this._amount = 0;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get duration() {
    return this._duration;
  }

  get amount() {
    return this._amount;
  }

  set amount(amount) {
    this._amount = amount;
  }

  toJSON(): TreatmentJson {
    return <TreatmentJson>{
      id: this.id,
    };
  }

  static fromJSON(json: TreatmentJson): Treatment {
    const treatment = new Treatment(json.id, json.name, json.duration);

    return treatment;
  }
}
