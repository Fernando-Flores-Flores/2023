import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/administrativo/service/login.service';
import { CatalogoService } from '../../services/catalogo.service';

@Component({
  selector: 'app-banner1',
  templateUrl: './banner1.component.html',
  styleUrls: ['./banner1.component.scss'],
})
export class Banner1Component implements OnInit {
  listaCatalogo: any = [];
  titulo: any = 'TENEMOS ESTAS PROMOCIONES';
  constructor(
    private loginService: LoginService,
    private router: Router,
    private catalogoService: CatalogoService
  ) {}

  ngOnInit(): void {
    if (this.loginService.estalogeado()) {
      this.router.navigate(['/admin/home']);
    } else {
      this.cargarRegistros('nov');
    }
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
