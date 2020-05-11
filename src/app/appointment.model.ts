import { Treatment } from "./treatment.model";

interface AppointmentJson {
  firstname: string;
  lastname: string;
  startMoment: Date;
  name: string;
  treatments: Treatment[];
}

export class Appointment {
  private _treatments: Treatment[];

  constructor(
    private _startMoment: Date,
    private _firstname: string,
    private _lastname: string
  ) {}

  get startMoment() {
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

  set treatments(treatments: Treatment[]) {
    this._treatments = treatments;
  }

  static fromJSON(json: AppointmentJson): Appointment {
    const appointment = new Appointment(
      json.startMoment,
      json.firstname,
      json.lastname
    );
    const newTreatments: Treatment[] = [];
    for (let treatment of json.treatments) {
      newTreatments.push(
        new Treatment(
          treatment.id,
          treatment.name,
          treatment.duration,
          treatment.category,
          treatment.price
        )
      );

      appointment.treatments = newTreatments;

      return appointment;
    }
  }
}
