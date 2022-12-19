import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FooterComponent } from "./shared/footer/footer.component";
import { HeaderComponent } from "./shared/header/header.component";
import { PaginaWebRoutingModule } from "./pagina-web-routing-module";
import { PagesWebComponent } from './pages-web/pages-web.component';

@NgModule({
  declarations: [FooterComponent, HeaderComponent, PagesWebComponent],
  imports: [CommonModule, PaginaWebRoutingModule],
})
export class PaginaWebModule {}
