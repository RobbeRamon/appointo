import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  NavbarModule,
  WavesModule,
  ButtonsModule,
  IconsModule,
  DropdownModule,
  InputUtilitiesModule
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
    InputUtilitiesModule
  ],
  exports: [
    NavbarModule,
    WavesModule,
    ButtonsModule,
    IconsModule,
    DropdownModule,
    InputUtilitiesModule
  ]
})
export class MdbootstrapModule {}
