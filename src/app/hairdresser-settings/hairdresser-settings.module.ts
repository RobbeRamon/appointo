import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { ManageWorkdaysComponent } from "./manage-workdays/manage-workdays.component";
import { SettingsOverviewComponent } from "./settings-overview/settings-overview.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MdbootstrapModule } from "../mdbootstrap/mdbootstrap.module";

const routes: Routes = [
  { path: "manage/settings", component: SettingsOverviewComponent },
];

@NgModule({
  declarations: [ManageWorkdaysComponent, SettingsOverviewComponent],
  imports: [
    CommonModule,
    MdbootstrapModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
})
export class HairdresserSettingsModule {}
