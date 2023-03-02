import { Component, OnInit } from '@angular/core';
import { CatalogoService } from '../../services/catalogo.service';

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
  styleUrls: ['./../pages-web.component.scss'],
})
export class PromocionesComponent implements OnInit {
  constructor(private catalogoService: CatalogoService) {}
  listaCatalogo: any = [];
  titulo: any = 'TENEMOS ESTAS PROMOCIONES';
  ngOnInit(): void {
    this.cargarRegistros('pro');
  }

  async cargarRegistros(novedad: string) {
    let response: any = await this.catalogoService.obtenerListaCatalogosNovedad(
      novedad
    );
    if (response.statusCode == 200) {
      this.listaCatalogo = response.datos;
    }
  }

}
