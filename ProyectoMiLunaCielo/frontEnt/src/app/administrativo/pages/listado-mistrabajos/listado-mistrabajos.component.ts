import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
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
      avance: [
        '',
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      estado: ['', [Validators.required]],
      fechaOrden: ['', [Validators.required]],
      fechaCreacion: ['', [Validators.required]],
      fechaModificacion: ['', [Validators.required]],
    });
  }

  editarTrabajoPaso1(item: any) {
    console.log(item);
    this.form.get('idOrdenTrabajo')?.patchValue(item.idOrdenTrabajo);
    this.form.get('idCliente')?.patchValue(item.idCliente);
    this.form.get('tipoTrabajo')?.patchValue(item.tipoTrabajo);
    this.form.get('descripcion')?.patchValue(item.descripcion);
    this.form.get('costo')?.patchValue(item.costo);
    this.form.get('tipoPago')?.patchValue(item.tipoPago);
    this.form.get('idPersonalAsignado')?.patchValue(item.idPersonalAsignado);
    this.form.get('fechaEntregaAprox')?.patchValue(item.fechaEntregaAprox);
    this.form.get('avance')?.patchValue(item.avance);
    this.form.get('estado')?.patchValue(item.estado);
    this.form.get('fechaOrden')?.patchValue(item.fechaOrden);
    this.form.get('fechaCreacion')?.patchValue(item.fechaCreacion);
    this.form.get('observaciones')?.patchValue(item.observaciones);
    this.form.get('fechaModificacion')?.patchValue(item.fechaModificacion);
  }

  async editarTrabajoPaso2() {
    let body: OrdenTrabajo = {
      idOrdenTrabajo: this.form.get('idOrdenTrabajo')?.value,
      idCliente: this.form.get('idCliente')?.value,
      tipoTrabajo: this.form.get('tipoTrabajo')?.value,
      descripcion: this.form.get('descripcion')?.value,
      costo: this.form.get('costo')?.value,
      observaciones: this.form.get('observaciones')?.value,
      tipoPago: this.form.get('tipoPago')?.value,
      idPersonalAsignado: this.form.get('idPersonalAsignado')?.value,
      fechaEntregaAprox: this.form.get('fechaEntregaAprox')?.value,
      avance: this.form.get('avance')?.value,
      estado: this.form.get('estado')?.value,
      fechaOrden: this.form.get('fechaOrden')?.value,
      fechaCreacion: this.form.get('fechaCreacion')?.value,
      fechaModificacion: this.form.get('fechaModificacion')?.value,
    };
    try {
      let response: any = await this.ventasService.updateOrdenTrabajo(
        body,
        this.form.get('idOrdenTrabajo')?.value
      );
      if (response.statusCode == 200) {
        Swal.fire({
          icon: 'success',
          title: 'Se realizo la actualización',
          confirmButtonText: 'Entendido',
        }).then(async (result) => {
          this.idUsuario = await this.loginService.obtenerCampoJWT('Id');
          let response: any = await this.ventasService.obtenerListaOrdenesPorID(
            this.idUsuario
          );
          if (response.statusCode == 200) {
            this.listaPrdenesTrabajo = response.listaOrdenes;
          }
        });
      }
    } catch (error: any) {
      Swal.fire({
        icon: 'warning',
        title: 'Ocurrió un error',
        confirmButtonText: 'Entendido',
      }).then(async (result) => {
        console.error(error);
        window.location.reload();
      });
    }
  }

  avance(signo: string) {
    let valor = this.form.get('avance')?.value;
    if (valor >= 0 && valor <= 100) {
      if (signo === '-') {
        let nuevoValor = valor - 1;
        this.form.get('avance')?.patchValue(nuevoValor);
      } else {
        if (signo === 'v') {
          if (this.form.get('avance')?.valid) {
            this.form.get('avance')?.patchValue(valor);
          } else {
            Swal.fire({
              icon: 'warning',
              title: 'Valor invalido, el valor por defecto será 0',
              confirmButtonText: 'Entendido',
            }).then(async (result) => {
              this.form.get('avance')?.patchValue(0);
            });
          }
        } else {
          let nuevoValor = valor + 1;
          this.form.get('avance')?.patchValue(nuevoValor);
        }
      }
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Valor invalido, el valor por defecto será 0',
        confirmButtonText: 'Entendido',
      }).then(async (result) => {
        this.form.get('avance')?.patchValue(0);
      });
    }
  }
}

export interface OrdenTrabajo {
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
