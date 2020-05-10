export interface TreatmentJson {
  id: number;
  name: string;
  duration: string;
  category: number;
  price: number;
}

export enum Category {
  MEN = "Mannen",
  WOMEN = "Vrouwen",
  CHILDREN = "Kinderen",
}

export class Treatment {
  private _amount: number;
  private _categoryString: string;

  constructor(
    private _id: number,
    private _name: string,
    private _duration: string,
    private _category: number,
    private _price: number
  ) {
    if (_category === 0) {
      this._categoryString = Category.MEN;
    } else if (_category === 1) {
      this._categoryString = Category.WOMEN;
    } else {
      this._categoryString = Category.CHILDREN;
    }

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

  get category() {
    return this._category;
  }

  get categoryString() {
    return this._categoryString;
  }

  get price() {
    return this._price;
  }

  set price(price) {
    this._price = price;
  }

  set name(name) {
    this._name = name;
  }

  set category(category) {
    this._category = category;

    if (this._category === 0) {
      this._categoryString = Category.MEN;
    } else if (this._category === 1) {
      this._categoryString = Category.WOMEN;
    } else {
      this._categoryString = Category.CHILDREN;
    }
  }

  toJSON(): TreatmentJson {
    return <TreatmentJson>{
      id: this.id,
    };
  }

  toFullJSON(): TreatmentJson {
    return <TreatmentJson>{
      id: this.id,
      category: this.category,
      duration: this.duration,
      name: this.name,
      price: this.price,
    };
  }

  static fromJSON(json: TreatmentJson): Treatment {
    const treatment = new Treatment(
      json.id,
      json.name,
      json.duration,
      json.category,
      json.price
    );

    return treatment;
  }
}
