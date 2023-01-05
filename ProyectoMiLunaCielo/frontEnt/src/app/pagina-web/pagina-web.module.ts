import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FooterComponent } from "./shared/footer/footer.component";
import { HeaderComponent } from "./shared/header/header.component";
import { PaginaWebRoutingModule } from "./pagina-web-routing-module";
import { PagesWebComponent } from './pages-web/pages-web.component';
import { UtilitariosModule } from "../utilitarios/utilitarios.module";

@NgModule({
  declarations: [FooterComponent, HeaderComponent, PagesWebComponent],
  imports: [CommonModule, PaginaWebRoutingModule,UtilitariosModule],
})
export class PaginaWebModule {}
