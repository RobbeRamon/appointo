import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { MaterialModule } from "../material/material.module";
import { HairdresserDetailComponent } from "./hairdresser-detail/hairdresser-detail.component";
import { HairdresserSliderComponent } from "./hairdresser-slider/hairdresser-slider.component";
import { MdbootstrapModule } from "../mdbootstrap/mdbootstrap.module";
import { TreatmentListComponent } from "./treatment-list/treatment-list.component";
import { TreatmentAddedComponent } from "./treatment-added/treatment-added.component";
import { HairdresserResolver } from "./HairdresserResolver";

const routes: Routes = [
  {
    path: "detail/:id",
    component: HairdresserDetailComponent,
    resolve: { hairdresser: HairdresserResolver },
  },
];

@NgModule({
  declarations: [
    HairdresserDetailComponent,
    HairdresserSliderComponent,
    TreatmentListComponent,
    TreatmentAddedComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MdbootstrapModule,
    MaterialModule,
    RouterModule.forChild(routes),
  ],
})
export class HairdresserDetailModule {}
