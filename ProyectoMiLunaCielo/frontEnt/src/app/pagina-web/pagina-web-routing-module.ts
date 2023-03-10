import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogoComponent } from './pages-web/catalogo/catalogo.component';
import { NosotrosComponent } from './pages-web/nosotros/nosotros.component';
import { PagesWebComponent } from './pages-web/pages-web.component';
import { PromocionesComponent } from './pages-web/promociones/promociones.component';
import { Banner1Component } from './shared/banner1/banner1.component';

const routes: Routes = [
  { path: '', component: PagesWebComponent },
  /*  { path: 'nosotros', component: NosotrosComponent }, */
  {
    path: 'web',
    component: PagesWebComponent,
    children: [
      { path: 'inicio', component: Banner1Component },
      { path: 'nosotros', component: NosotrosComponent },
      { path: 'dashboard', component: Banner1Component },
      { path: 'catalogo', component: CatalogoComponent },
      { path: 'promociones', component: PromocionesComponent },
      { path: 'catalogo/:parametro', component: CatalogoComponent },
      /*       { path: "prueba1", component: Prueba1Component },
      { path: "prueba2", component: Prueba2Component }, */
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class PaginaWebRoutingModule {}
