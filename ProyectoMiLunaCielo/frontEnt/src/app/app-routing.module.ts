import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PagesComponent } from "./administrativo/pages/pages.component";
import { PagesWebComponent } from "./pagina-web/pages-web/pages-web.component";

const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      /*  { path: "center", component: CenterComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "prueba1", component: Prueba1Component },
      { path: "prueba2", component: Prueba2Component }, */
    ],
  },
  {
    path: "admin",
    component: PagesComponent,
  },
  { path: "MiLunaCielo", component: PagesWebComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
