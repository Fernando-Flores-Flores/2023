import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PagesComponent } from "./pages/pages.component";
import { HeaderAdminComponent } from "./shared/header-admin/header-admin.component";
import { SidebarAdminComponent } from "./shared/sidebar-admin/sidebar-admin.component";
import { FooterAdminComponent } from "./shared/footer-admin/footer-admin.component";
import { LoginComponent } from "./auth/login/login.component";
import { LogoutComponent } from "./auth/logout/logout.component";
import { RouterModule } from "@angular/router";
import { HomeComponent } from './pages/home/home.component';
import { RegistroUsuariosComponent } from './pages/registro-usuarios/registro-usuarios.component';
import { ListadoUsuarioComponent } from './pages/listado-usuario/listado-usuario.component';
import { DataTablesModule } from 'angular-datatables';
import { RegistroInventariosComponent } from './pages/registro-inventarios/registro-inventarios.component';
import { RegistroOrdenTrabajoComponent } from './pages/registro-orden-trabajo/registro-orden-trabajo.component';
import { ListadoMistrabajosComponent } from './pages/listado-mistrabajos/listado-mistrabajos.component';
@NgModule({
  declarations: [
    PagesComponent,
    HeaderAdminComponent,
    SidebarAdminComponent,
    FooterAdminComponent,
    LoginComponent,
    LogoutComponent,
    HomeComponent,
    RegistroUsuariosComponent,
    ListadoUsuarioComponent,
    RegistroInventariosComponent,
    RegistroOrdenTrabajoComponent,
    ListadoMistrabajosComponent,
  ],
  imports: [CommonModule, RouterModule,DataTablesModule],
})
export class AdministrativoModule {}
