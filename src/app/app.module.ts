import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { MainNavComponent } from "./main-nav/main-nav.component";
import { MdbootstrapModule } from "./mdbootstrap/mdbootstrap.module";
import { HairdresserModule } from "./hairdresser/hairdresser.module";
import { AppRoutingModule } from "./app-routing/app-routing.module";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { HairdresserDetailModule } from "./hairdresser-detail/hairdresser-detail.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CreateAppointmentModule } from "./create-appointment/create-appointment.module";

// const appRoutes: Routes = [
//   { path: "hairdresser/list", component: HairdresserListComponent },
//   { path: "", redirectTo: "hairdresser/list", pathMatch: "full" },
//   { path: "**", component: PageNotFoundComponent }
// ];

@NgModule({
  declarations: [AppComponent, MainNavComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    MdbootstrapModule,
    HairdresserModule,
    //RouterModule.forRoot(appRoutes),
    AppRoutingModule,
    HairdresserDetailModule,
    BrowserAnimationsModule,
    CreateAppointmentModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
