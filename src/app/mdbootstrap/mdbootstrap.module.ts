import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  NavbarModule,
  WavesModule,
  ButtonsModule,
  IconsModule,
  DropdownModule,
  InputUtilitiesModule,
  CardsModule
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
    CardsModule
  ],
  exports: [
    NavbarModule,
    WavesModule,
    ButtonsModule,
    IconsModule,
    DropdownModule,
    InputUtilitiesModule,
    CardsModule
  ]
})
export class MdbootstrapModule {}
