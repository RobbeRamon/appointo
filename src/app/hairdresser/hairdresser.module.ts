import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

import { HairdresserComponent } from "./hairdresser/hairdresser.component";
import { TreatmentComponent } from "./treatment/treatment.component";
import { FindHairdresserComponent } from "./find-hairdresser/find-hairdresser.component";
import { MdbootstrapModule } from "../mdbootstrap/mdbootstrap.module";
import { ReactiveFormsModule } from "@angular/forms";
import { HairdresserListComponent } from "./hairdresser-list/hairdresser-list.component";

@NgModule({
  declarations: [
    HairdresserComponent,
    TreatmentComponent,
    FindHairdresserComponent,
    HairdresserListComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MdbootstrapModule,
    ReactiveFormsModule
  ],
  exports: [
    FindHairdresserComponent,
    HairdresserComponent,
    HairdresserListComponent
  ]
})
export class HairdresserModule {}
