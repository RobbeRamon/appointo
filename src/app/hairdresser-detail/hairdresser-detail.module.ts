import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HairdresserDetailComponent } from "./hairdresser-detail/hairdresser-detail.component";
import { HairdresserSliderComponent } from "./hairdresser-slider/hairdresser-slider.component";

@NgModule({
  declarations: [HairdresserDetailComponent, HairdresserSliderComponent],
  imports: [CommonModule]
})
export class HairdresserDetailModule {}
