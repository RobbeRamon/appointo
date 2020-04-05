import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

import { HairdresserComponent } from "./hairdresser/hairdresser.component";
import { MdbootstrapModule } from "../mdbootstrap/mdbootstrap.module";
import { ReactiveFormsModule } from "@angular/forms";
import { HairdresserListComponent } from "./hairdresser-list/hairdresser-list.component";
import { AppRoutingModule } from "../app-routing/app-routing.module";
import { FindHairdresserComponent } from "./find-hairdresser/find-hairdresser.component";
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [
    HairdresserComponent,
    HairdresserListComponent,
    FindHairdresserComponent,
    TestComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MdbootstrapModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  exports: [
    HairdresserComponent,
    HairdresserListComponent,
    FindHairdresserComponent,
  ],
})
export class HairdresserModule {}
