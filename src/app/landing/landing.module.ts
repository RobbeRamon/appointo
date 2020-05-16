import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { MdbootstrapModule } from "../mdbootstrap/mdbootstrap.module";
import { BenefitsComponent } from "./benefits/benefits.component";
import { LandingComponent } from "./landing/landing.component";
import { FindHairdresserComponent } from "./find-hairdresser/find-hairdresser.component";
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [BenefitsComponent, LandingComponent, FindHairdresserComponent, FooterComponent],
  imports: [CommonModule, MdbootstrapModule, ReactiveFormsModule],
  exports: [FindHairdresserComponent],
})
export class LandingModule {}
