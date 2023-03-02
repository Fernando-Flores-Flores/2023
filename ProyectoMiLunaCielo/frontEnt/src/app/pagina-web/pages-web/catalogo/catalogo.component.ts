import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CatalogoService } from '../../services/catalogo.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  //styleUrls: ['./catalogo.component.scss'],
  styleUrls: ['./../pages-web.component.scss'],
})
export class CatalogoComponent implements OnInit, AfterViewInit, OnDestroy {
  titulo: any = '';
  estado: string = 'HABILITADO';
  tipoCatalogo: string = 'all';
  listaCatalogo: any = [];
  private routeSubscription: Subscription | undefined;

  constructor(
    private routerActivated: ActivatedRoute,
    private router: Router,
    private catalogoService: CatalogoService
  ) {}

  ngAfterViewInit() {
    this.cargarRegistros(this.estado, this.tipoCatalogo);
  }

  ngOnInit(): void {
    this.routeSubscription = this.routerActivated.paramMap.subscribe(params => {
      const tipo = params.get('parametro');
      if (tipo) {
        this.verificarInvetarios(tipo);
        this.cargarRegistros(this.estado, this.tipoCatalogo);
      } else {
        this.router.navigate(['/admin']);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  async verificarInvetarios(tipo: string) {
    switch (tipo) {
      case 'all':
        this.titulo = 'TODOS';
        this.tipoCatalogo = 'all';
        break;
      case 'materialGrafico':
        this.titulo = 'MATERIAL GRÁFICO';
        this.tipoCatalogo = 'grafico';
        break;
      case 'libros':
        this.titulo = 'LIBROS';
        this.tipoCatalogo = 'libros';
        break;
      case 'otros':
        this.titulo = 'LONAS Y VINILOS';
        this.tipoCatalogo = 'otros';
        break;
      case 'merchadesing':
        this.titulo = 'MARCHADESING';
        this.tipoCatalogo = 'mercha';
        break;
      default:
        this.router.navigate(['/admin']);
        break;
    }
  }

  async cargarRegistros(estado: string, tipoCatalogo: string) {
    let response: any = await this.catalogoService.obtenerListaCatalogos(
      estado,
      tipoCatalogo
    );
    if (response.statusCode == 200) {
      this.listaCatalogo = response.datos;
    }
  }
}
