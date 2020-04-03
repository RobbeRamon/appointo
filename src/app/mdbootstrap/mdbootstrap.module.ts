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
  CarouselModule
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
    CarouselModule.forRoot()
  ],
  exports: [
    NavbarModule,
    WavesModule,
    ButtonsModule,
    IconsModule,
    DropdownModule,
    InputUtilitiesModule,
    CardsModule,
    CarouselModule
  ]
})
export class MdbootstrapModule {}
