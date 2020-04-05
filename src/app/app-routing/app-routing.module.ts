import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

import { HairdresserListComponent } from "../hairdresser/hairdresser-list/hairdresser-list.component";
import { PageNotFoundComponent } from "../page-not-found/page-not-found.component";
import { HairdresserDetailComponent } from "../hairdresser-detail/hairdresser-detail/hairdresser-detail.component";
import { HairdresserResolver } from "../hairdresser-detail/HairdresserResolver";
import { FindHairdresserComponent } from "../hairdresser/find-hairdresser/find-hairdresser.component";

const appRoutes: Routes = [
  { path: "", component: FindHairdresserComponent },
  { path: "kappers/lijst", component: HairdresserListComponent },
  {
    path: "kapper/detail/:id",
    component: HairdresserDetailComponent,
    resolve: { hairdresser: HairdresserResolver }
  },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
