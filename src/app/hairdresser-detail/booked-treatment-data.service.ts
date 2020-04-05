import { Injectable } from "@angular/core";
import { Treatment } from "../treatment.model";

@Injectable({
  providedIn: "root",
})
export class BookedTreatmentDataService {
  private _bookedTreatments: Treatment[];

  constructor() {
    this._bookedTreatments = [];
  }

  get bookedTreatments() {
    return this._bookedTreatments;
  }

  bookTreatment(treatment: Treatment) {
    this._bookedTreatments = [...this._bookedTreatments, treatment];
  }
}
