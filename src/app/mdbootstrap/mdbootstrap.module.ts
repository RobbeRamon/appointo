import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  NavbarModule,
  WavesModule,
  ButtonsModule,
  IconsModule,
  DropdownModule,
  InputUtilitiesModule,
  CardsModule,
  CarouselModule,
  MDBBootstrapModule,
  InputsModule,
} from "angular-bootstrap-md";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NavbarModule,
    WavesModule.forRoot(),
    ButtonsModule.forRoot(),
    IconsModule,
    DropdownModule.forRoot(),
    InputUtilitiesModule,
    CardsModule,
    InputsModule.forRoot(),
    CarouselModule.forRoot(),
  ],
  exports: [
    NavbarModule,
    WavesModule,
    ButtonsModule,
    IconsModule,
    DropdownModule,
    InputUtilitiesModule,
    CardsModule,
    InputsModule,
    CarouselModule,
  ],
})
export class MdbootstrapModule {}
