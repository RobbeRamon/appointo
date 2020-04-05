import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookedTreatmentDataService } from 'src/app/booked-treatment-data.service';
import { Hairdresser } from 'src/app/hairdresser.model';

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.scss']
})
export class CreateAppointmentComponent implements OnInit {
  public hairdresser: Hairdresser; 

  constructor(private route: ActivatedRoute, private _bookedTreatmentDataService: BookedTreatmentDataService) { }

  ngOnInit(): void {
    this.route.data.subscribe(item => (this.hairdresser = item["hairdresser"]));
  }

  get treatments() {
    return this._bookedTreatmentDataService.bookedTreatments;
  }

  get hairdresserFromDataService() {
    return this._bookedTreatmentDataService.hairdresser;
  }
}
