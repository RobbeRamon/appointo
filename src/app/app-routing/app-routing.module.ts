import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { CommonModule } from "@angular/common";
import { PageNotFoundComponent } from "../page-not-found/page-not-found.component";
import { AuthGuard } from "../user/auth.guard";
import { LandingComponent } from "../landing/landing/landing.component";

const appRoutes: Routes = [
  {
    path: "hairdresser",
    loadChildren: () =>
      import("../hairdresser/hairdresser.module").then(
        (mod) => mod.HairdresserModule
      ),
    data: { preload: true },
  },
  {
    path: "hairdresser",
    loadChildren: () =>
      import("../hairdresser-detail/hairdresser-detail.module").then(
        (mod) => mod.HairdresserDetailModule
      ),
    data: { preload: true },
  },
  {
    path: "manage",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("../hairdresser-settings/hairdresser-settings.module").then(
        (mod) => mod.HairdresserSettingsModule
      ),
    data: { preload: true },
  },
  {
    path: "manage",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("../calendar/calendar.module").then((mod) => mod.CalendarModule),
    data: { preload: true },
  },

  { path: "", component: LandingComponent },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
