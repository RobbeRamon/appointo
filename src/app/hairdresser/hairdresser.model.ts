interface HairdresserJson {
  id: number;
  name: string;
}

export class Hairdresser {
  private _id: number;

  constructor(private _name: string) {}

  get name() {
    return this._name;
  }

  static fromJSON(json: HairdresserJson): Hairdresser {
    const hairdresser = new Hairdresser(json.name);
    hairdresser._id = json.id;
    return hairdresser;
  }
}
