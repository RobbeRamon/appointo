import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

import { HairdresserComponent } from "./hairdresser/hairdresser.component";
import { MdbootstrapModule } from "../mdbootstrap/mdbootstrap.module";
import { ReactiveFormsModule } from "@angular/forms";
import { HairdresserListComponent } from "./hairdresser-list/hairdresser-list.component";
import { FindHairdresserComponent } from "./find-hairdresser/find-hairdresser.component";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [{ path: "list", component: HairdresserListComponent }];

@NgModule({
  declarations: [
    HairdresserComponent,
    HairdresserListComponent,
    FindHairdresserComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MdbootstrapModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    HairdresserComponent,
    HairdresserListComponent,
    FindHairdresserComponent,
  ],
})
export class HairdresserModule {}
