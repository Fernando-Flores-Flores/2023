import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  form: FormGroup;
  listaPrdenesTrabajo: any = [];
  constructor(
    private ventasService: VentasService,
    private envioDatos: EnvioDatosEntreComponentesService,
    public loginService: LoginService,
    private formBuilder: FormBuilder
  ) {
    this.builrForm();
  }

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
  private builrForm() {
    this.form = this.formBuilder.group({
      idOrdenTrabajo: ['', [Validators.required]],
      idCliente: ['', [Validators.required]],
      tipoTrabajo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      costo: ['', [Validators.required]],
      observaciones: ['', [Validators.required]],
      tipoPago: ['', [Validators.required]],
      idPersonalAsignado: ['', [Validators.required]],
      fechaEntregaAprox: ['', [Validators.required]],
      avance: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      fechaOrden: ['', [Validators.required]],
      fechaCreacion: ['', [Validators.required]],
      fechaModificacion: ['', [Validators.required]],
    });
  }
  /*
     "idOrdenTrabajo": 22,
      "idCliente": 66,
      "tipoTrabajo": "MANUAL",
      "descripcion": "CINTAS MAGNETICAS",
      "costo": 500,
      "observaciones": "300 CINTAS PARA DISCOTECA COMADRES",
      "tipoPago": "EFECTIVO",
      "idPersonalAsignado": "f9860231-814e-43d0-ba84-ee18635a1054",
      "fechaEntregaAprox": "2023-02-16T00:00:00",
      "avance": 0,
      "estado": "creado",
      "fechaOrden": "2023-02-16T00:00:00",
      "fechaCreacion": "2023-02-16T19:12:34.683528Z",
      "fechaModificacion": "2023-02-16T19:12:34.683561Z"
*/
}

export interface Welcome {
  idOrdenTrabajo: number;
  idCliente: number;
  tipoTrabajo: string;
  descripcion: string;
  costo: number;
  observaciones: string;
  tipoPago: string;
  idPersonalAsignado: string;
  fechaEntregaAprox: Date;
  avance: number;
  estado: string;
  fechaOrden: Date;
  fechaCreacion: Date;
  fechaModificacion: Date;
}
