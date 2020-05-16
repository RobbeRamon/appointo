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
  TableModule,
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
    CardsModule.forRoot(),
    InputsModule.forRoot(),
    CarouselModule.forRoot(),
    TableModule,
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
    TableModule,
  ],
})
export class MdbootstrapModule {}
