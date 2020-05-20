import { Treatment, TreatmentJson } from "./treatment.model";
import { TimeSpan } from "./timespan.model";

interface HairdresserJson {
  id: number;
  name: string;
  treatments: TreatmentJson[];
  bannerPath: string;
  cardImagePath: string;
}

export class Hairdresser {
  private _id: number;
  private _treatments: Treatment[];
  private _bannerPath: string;
  private _cardImagePath: string;

  constructor(private _name: string) {}

  get name() {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get id() {
    return this._id;
  }

  get treatments() {
    return this._treatments;
  }

  get bannerPath() {
    return this._bannerPath;
  }

  get cardImagePath() {
    return this._cardImagePath;
  }

  set bannerPath(bannerPath: string) {
    this._bannerPath = bannerPath;
  }

  set cardImagePath(cardImagePath: string) {
    this._cardImagePath = cardImagePath;
  }

  toJSON(): HairdresserJson {
    return <HairdresserJson>{
      id: this.id,
      name: this.name,
    };
  }

  static fromJSON(json: HairdresserJson): Hairdresser {
    const hairdresser = new Hairdresser(json.name);
    hairdresser._id = json.id;
    hairdresser._treatments = json.treatments.map(
      (tr: TreatmentJson): Treatment =>
        new Treatment(
          tr.id,
          tr.name,
          TimeSpan.fromJSON(tr.duration),
          tr.category,
          tr.price
        )
    );
    hairdresser.bannerPath = json.bannerPath;
    hairdresser.cardImagePath = json.cardImagePath;
    return hairdresser;
  }
}
