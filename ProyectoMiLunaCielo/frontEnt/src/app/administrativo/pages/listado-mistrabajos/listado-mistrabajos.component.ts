import { AfterViewInit, Component, OnInit } from '@angular/core';
import { EnvioDatosEntreComponentesService } from '../../service/envio-datos-entre-componentes.service';
import { LoginService } from '../../service/login.service';
import { VentasService } from '../../service/ventas.service';
declare var $: any;
@Component({
  selector: 'app-listado-mistrabajos',
  templateUrl: './listado-mistrabajos.component.html',
  styleUrls: ['./listado-mistrabajos.component.scss'],
})
export class ListadoMistrabajosComponent implements OnInit, AfterViewInit {
  titulo = 'TRABAJOS QUE TENGO ASIGNADO';
  idUsuario = '';

  listaPrdenesTrabajo: any = [];
  constructor(
    private ventasService: VentasService,
    private envioDatos: EnvioDatosEntreComponentesService,
    public loginService: LoginService
  ) {}

  async ngOnInit() {}

  async ngAfterViewInit() {
    try {
      /*  let responseID: any = await this.envioDatos.currentMessage.subscribe(
        (message) => (this.id = message)
      );
      console.log('WWWWWWWWWWWWWWWWWW');
      console.log('WWWWWWWWWWWWWWWWWW');
      console.log('WWWWWWWWWWWWWWWWWW');
      console.log('WWWWWWWWWWWWWWWWWW');
      console.log(this.id);
      console.log('WWWWWWWWWWWWWWWWWW');
      console.log('WWWWWWWWWWWWWWWWWW');
      console.log('WWWWWWWWWWWWWWWWWW');
      console.log('WWWWWWWWWWWWWWWWWW'); */
      this.idUsuario = await this.loginService.obtenerCampoJWT('Id');
      let response: any = await this.ventasService.obtenerListaOrdenesPorID(
        this.idUsuario
      );
      if (response.statusCode == 200) {
        this.listaPrdenesTrabajo = response.listaOrdenes;
      }
    } catch (error) {
      console.error(error);
    }
  }
}
