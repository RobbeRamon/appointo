import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { MainNavComponent } from "./main-nav/main-nav.component";
import { MdbootstrapModule } from "./mdbootstrap/mdbootstrap.module";
import { HairdresserModule } from "./hairdresser/hairdresser.module";

@NgModule({
  declarations: [AppComponent, MainNavComponent],
  imports: [BrowserModule, MdbootstrapModule, HairdresserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
