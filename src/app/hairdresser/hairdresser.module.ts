import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

import { HairdresserComponent } from "./hairdresser/hairdresser.component";
import { MdbootstrapModule } from "../mdbootstrap/mdbootstrap.module";
import { ReactiveFormsModule } from "@angular/forms";
import { HairdresserListComponent } from "./hairdresser-list/hairdresser-list.component";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "../app-routing/app-routing.module";

@NgModule({
  declarations: [HairdresserComponent, HairdresserListComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MdbootstrapModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  exports: [HairdresserComponent, HairdresserListComponent]
})
export class HairdresserModule {}
