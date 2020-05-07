import { Treatment } from "./treatment.model";

interface AppointmentJson {
  startMoment: Date;
  name: string;
  treatments: Treatment[];
}

export class Appointment {
  private _treatments: Treatment[];

  constructor(private _startMoment: Date) {}

  get startMoment() {
    return this._startMoment;
  }

  get treatments() {
    return this._treatments;
  }

  set treatments(treatments: Treatment[]) {
    this._treatments = treatments;
  }

  static fromJSON(json: AppointmentJson): Appointment {
    const appointment = new Appointment(json.startMoment);
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
