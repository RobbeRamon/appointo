import { Treatment } from "./treatment.model";

interface AppointmentJson {
  id: number;
  firstname: string;
  lastname: string;
  startMoment: Date;
  name: string;
  treatments: Treatment[];
}

export class Appointment {
  private _treatments: Treatment[];
  private _id: number;

  constructor(
    private _startMoment: Date,
    private _firstname: string,
    private _lastname: string
  ) {}

  get startMoment(): Date {
    return this._startMoment;
  }

  get treatments() {
    return this._treatments;
  }

  get firstname() {
    return this._firstname;
  }

  get lastname() {
    return this._lastname;
  }

  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
  }

  set treatments(treatments: Treatment[]) {
    this._treatments = treatments;
  }

  static fromJSON(json: AppointmentJson): Appointment {
    const appointment = new Appointment(
      json.startMoment,
      json.firstname,
      json.lastname
    );

    appointment.id = json.id;

    appointment.treatments = json.treatments.map((tr) =>
      Treatment.fromJSON(tr)
    );

    return appointment;
  }
}
