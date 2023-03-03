import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages/pages.component';
import { HeaderAdminComponent } from './shared/header-admin/header-admin.component';
import { SidebarAdminComponent } from './shared/sidebar-admin/sidebar-admin.component';
import { FooterAdminComponent } from './shared/footer-admin/footer-admin.component';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegistroUsuariosComponent } from './pages/registro-usuarios/registro-usuarios.component';
import { ListadoUsuarioComponent } from './pages/listado-usuario/listado-usuario.component';
import { DataTablesModule } from 'angular-datatables';
import { RegistroInventariosComponent } from './pages/registro-inventarios/registro-inventarios.component';
import { RegistroOrdenTrabajoComponent } from './pages/registro-orden-trabajo/registro-orden-trabajo.component';
import { ListadoMistrabajosComponent } from './pages/listado-mistrabajos/listado-mistrabajos.component';
import { RegisterComponent } from './auth/register/register.component';
import { FormularioAutenticacionComponent } from './auth/formulario-autenticacion/formulario-autenticacion.component';
import { UtilitariosModule } from '../utilitarios/utilitarios.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistroVentasComponent } from './pages/registro-ventas/registro-ventas.component';
import { RolesPipe } from './pipes/roles.pipe';
import { PaginaWebModule } from '../pagina-web/pagina-web.module';
import { RegistroCatalogosComponent } from './pages/registro-catalogos/registro-catalogos.component';
import { NotificacionesComponent } from './pages/notificaciones/notificaciones.component';
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
    RegisterComponent,
    FormularioAutenticacionComponent,
    RegistroVentasComponent,
    RolesPipe,
    RegistroCatalogosComponent,
    NotificacionesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    DataTablesModule,
    UtilitariosModule,
    FormsModule,
    ReactiveFormsModule,PaginaWebModule
  ],
})
export class AdministrativoModule {}
