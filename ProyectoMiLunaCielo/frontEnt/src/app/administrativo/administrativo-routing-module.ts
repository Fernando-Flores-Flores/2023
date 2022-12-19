import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PagesComponent } from "./pages/pages.component";
import { LoginComponent } from "./auth/login/login.component";
import { HomeComponent } from "./pages/home/home.component";
import { RegistroUsuariosComponent } from "./pages/registro-usuarios/registro-usuarios.component";
import { ListadoUsuarioComponent } from "./pages/listado-usuario/listado-usuario.component";
import { RegistroInventariosComponent } from "./pages/registro-inventarios/registro-inventarios.component";
import { RegistroOrdenTrabajoComponent } from "./pages/registro-orden-trabajo/registro-orden-trabajo.component";
import { ListadoMistrabajosComponent } from "./pages/listado-mistrabajos/listado-mistrabajos.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  {
    path: "admin",
    component: PagesComponent,
    children: [
      { path: "home", component: HomeComponent },
      { path: "registroUsuarios", component: RegistroUsuariosComponent },
      { path: "listadoUsuarios", component: ListadoUsuarioComponent },
      { path: "registroOrden", component: RegistroOrdenTrabajoComponent },
      { path: "misTrabajos", component: ListadoMistrabajosComponent },
      { path: "registroInventario/:parametro", component: RegistroInventariosComponent },

      /*       { path: "prueba1", component: Prueba1Component },
      { path: "prueba2", component: Prueba2Component }, */
    ],
  },
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
export class AdministrativoRoutingModule {}
