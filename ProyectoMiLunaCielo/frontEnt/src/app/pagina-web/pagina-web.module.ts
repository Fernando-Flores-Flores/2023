import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FooterComponent } from "./shared/footer/footer.component";
import { HeaderComponent } from "./shared/header/header.component";
import { PaginaWebRoutingModule } from "./pagina-web-routing-module";
import { PagesWebComponent } from './pages-web/pages-web.component';
import { UtilitariosModule } from "../utilitarios/utilitarios.module";
import { Banner1Component } from './shared/banner1/banner1.component';
import { NosotrosComponent } from './pages-web/nosotros/nosotros.component';

@NgModule({
  declarations: [FooterComponent, HeaderComponent, PagesWebComponent, Banner1Component, NosotrosComponent],
  imports: [CommonModule, PaginaWebRoutingModule,UtilitariosModule],
})
export class PaginaWebModule {}
