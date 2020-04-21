import { Treatment, TreatmentJson } from "./treatment.model";

interface HairdresserJson {
  id: number;
  name: string;
  treatments: TreatmentJson[];
}

export class Hairdresser {
  private _id: number;
  private _treatments: Treatment[];

  constructor(private _name: string) {}

  get name() {
    return this._name;
  }

  get id() {
    return this._id;
  }

  get treatments() {
    return this._treatments;
  }

  static fromJSON(json: HairdresserJson): Hairdresser {
    const hairdresser = new Hairdresser(json.name);
    hairdresser._id = json.id;
    hairdresser._treatments = json.treatments.map(
      (tr: TreatmentJson): Treatment =>
        new Treatment(tr.id, tr.name, tr.duration, tr.category, tr.price)
    );
    return hairdresser;
  }
}
