import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PagesWebComponent } from "./pages-web/pages-web.component";

const routes: Routes = [
  { path: "pagina", component: PagesWebComponent },
  /*  {
    path: "",
    component: PagesComponent,
    children: [
      { path: "center", component: CenterComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "prueba1", component: Prueba1Component },
      { path: "prueba2", component: Prueba2Component },
    ],
  }, */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class PaginaWebRoutingModule {}
