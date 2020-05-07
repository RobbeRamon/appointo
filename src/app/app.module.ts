import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { MainNavComponent } from "./main-nav/main-nav.component";
import { MdbootstrapModule } from "./mdbootstrap/mdbootstrap.module";
import { HairdresserModule } from "./hairdresser/hairdresser.module";
import { AppRoutingModule } from "./app-routing/app-routing.module";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CreateAppointmentModule } from "./create-appointment/create-appointment.module";
import { UserModule } from "./user/user.module";
import { httpInterceptorProviders } from "./interceptor/providers";
import { HairdresserSettingsModule } from "./hairdresser-settings/hairdresser-settings.module";
import { CalendarModule } from "./calendar/calendar.module";

@NgModule({
  declarations: [AppComponent, MainNavComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    MdbootstrapModule,
    HairdresserModule,
    BrowserAnimationsModule,
    CreateAppointmentModule,
    UserModule,
    HairdresserSettingsModule,
    CalendarModule,
    AppRoutingModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
