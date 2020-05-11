import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { ManageWorkdaysComponent } from "./manage-workdays/manage-workdays.component";
import { SettingsOverviewComponent } from "./settings-overview/settings-overview.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MdbootstrapModule } from "../mdbootstrap/mdbootstrap.module";
import { ManageTreatmentsComponent } from "./manage-treatments/manage-treatments.component";
import { EditTreatmentComponent } from "./edit-treatment/edit-treatment.component";
import { TreatmentResolver } from "./TreatmentResolver";
import { CreateTreatmentComponent } from "./create-treatment/create-treatment.component";
import { DeleteTreatmentComponent } from "./delete-treatment/delete-treatment.component";
import { EditHairdresserComponent } from './edit-hairdresser/edit-hairdresser.component';

const routes: Routes = [
  { path: "settings", component: SettingsOverviewComponent },
  { path: "treatments", component: ManageTreatmentsComponent },
  { path: "workdays", component: ManageWorkdaysComponent },
  {
    path: "treatments/edit/:id",
    component: EditTreatmentComponent,
    resolve: { treatment: TreatmentResolver },
  },
  {
    path: "treatments/create",
    component: CreateTreatmentComponent,
  },
];

@NgModule({
  declarations: [
    ManageWorkdaysComponent,
    SettingsOverviewComponent,
    ManageTreatmentsComponent,
    EditTreatmentComponent,
    CreateTreatmentComponent,
    DeleteTreatmentComponent,
    EditHairdresserComponent,
  ],
  imports: [
    CommonModule,
    MdbootstrapModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class HairdresserSettingsModule {}
