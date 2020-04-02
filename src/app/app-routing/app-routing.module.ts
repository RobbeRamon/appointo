import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

import { HairdresserListComponent } from "../hairdresser/hairdresser-list/hairdresser-list.component";
import { PageNotFoundComponent } from "../page-not-found/page-not-found.component";
import { HairdresserComponent } from "../hairdresser/hairdresser/hairdresser.component";

const appRoutes: Routes = [
  { path: "hairdresser/list", component: HairdresserListComponent },
  { path: "hairdresser/detail/:id", component: HairdresserComponent },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
