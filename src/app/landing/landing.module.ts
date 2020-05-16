import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { MdbootstrapModule } from "../mdbootstrap/mdbootstrap.module";
import { BenefitsComponent } from "./benefits/benefits.component";
import { LandingComponent } from "./landing/landing.component";
import { HairdresserModule } from "../hairdresser/hairdresser.module";

@NgModule({
  declarations: [BenefitsComponent, LandingComponent],
  imports: [
    CommonModule,
    MdbootstrapModule,
    ReactiveFormsModule,
    HairdresserModule,
  ],
  exports: [],
})
export class LandingModule {}
