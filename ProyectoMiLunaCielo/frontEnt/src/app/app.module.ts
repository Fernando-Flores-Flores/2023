import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { AdministrativoRoutingModule } from "./administrativo/administrativo-routing-module";
import { AdministrativoModule } from "./administrativo/administrativo.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PaginaWebModule } from "./pagina-web/pagina-web.module";
import { DataTablesModule } from "angular-datatables";
import { SpinnerInterceptor } from './pagina-web/shared/spinner/spinner.interceptor';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    AppRoutingModule,
    AdministrativoRoutingModule,
    AdministrativoModule,
    PaginaWebModule,DataTablesModule
  ],
  exports:[
    RouterModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:SpinnerInterceptor,multi:true}],
  bootstrap: [AppComponent],
})
export class AppModule {}
