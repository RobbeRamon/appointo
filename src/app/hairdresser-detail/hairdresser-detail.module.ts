import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HairdresserDetailComponent } from "./hairdresser-detail/hairdresser-detail.component";
import { HairdresserSliderComponent } from "./hairdresser-slider/hairdresser-slider.component";
import { MdbootstrapModule } from "../mdbootstrap/mdbootstrap.module";
import { Hairdresser } from "../hairdresser.model";

@NgModule({
  declarations: [HairdresserDetailComponent, HairdresserSliderComponent],
  imports: [CommonModule, MdbootstrapModule]
})
export class HairdresserDetailModule {}
