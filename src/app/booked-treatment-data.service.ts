import { Injectable } from "@angular/core";
import { Treatment } from "./treatment.model";
import { Hairdresser } from "./hairdresser.model";

@Injectable({
  providedIn: "root",
})
export class BookedTreatmentDataService {
  private _bookedTreatments: Treatment[];
  private _hairdresser: Hairdresser;

  constructor() {
    this._bookedTreatments = [];
  }

  get bookedTreatments() {
    return this._bookedTreatments;
  }

  get hairdresser() {
    return this._hairdresser;
  }

  set hairdresser(hairdresser: Hairdresser) {
    this._hairdresser = hairdresser;
  }

  bookTreatment(treatment: Treatment) {
    this._bookedTreatments = [...this._bookedTreatments, treatment];
  }

  removeTreatment(treatment: Treatment) {
    for (let i = 0; i < this._bookedTreatments.length; i++) {
      if (this._bookedTreatments[i] == treatment) {
        this._bookedTreatments.splice(i, 1);
      }
    }
  }

  resetTreatments() {
    this._bookedTreatments = [];
  }
}
