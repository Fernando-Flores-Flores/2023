import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Subject, Subscription } from 'rxjs';
import { parsearErroresAPI, PersonaInDto } from 'src/app/Model/auth';
import { InventarioDto, Response } from 'src/app/Model/inventario';
import { Cliente, VentasDTO } from 'src/app/Model/ventas';
import Swal from 'sweetalert2';
import { InventariosService } from '../../service/inventarios.service';
import { LoginService } from '../../service/login.service';
import { MetodosService } from '../../service/metodos.service';
import { UsuariosService } from '../../service/usuarios.service';
import { VentasService } from '../../service/ventas.service';
declare var $: any;

@Component({
  selector: 'app-registro-ventas',
  templateUrl: './registro-ventas.component.html',
  styleUrls: ['./registro-ventas.component.scss'],
})
export class RegistroVentasComponent implements OnInit {
  titulo: any = 'ORDEN DE TRABAJO';
  idTipoFormulario: string = '';
  suscription!: Subscription;
  listaUsuarios: any = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: any = new Subject<any>();
  form: FormGroup;
  listadoCuentas: any = [];
  tipoRol: any = 'prod';
  errores: string[];

  constructor(
    private ventasService: VentasService,
    private loginService: LoginService,
    private routerActivated: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private metodosService: MetodosService,
    private usuariosService: UsuariosService
  ) {
    this.buildForm();
    this.dtTrigger.next();
  }
  async cargarRegistros(idTipoInventario: string) {
    let response: Response = await this.ventasService.obtenerListaOrdenes();
    if (response.statusCode == 200) {
      this.listaUsuarios = response.datos;
      console.log(this.listaUsuarios);

      this.dtTrigger.next();
    }
  }

  async cargarListadosCuentasRol(valorRol: string) {
    try {
      let response: Response = await this.usuariosService.obtenerListaCuentas(
        this.tipoRol
      );
      if (response.statusCode == 200) {
        this.listadoCuentas = response.datos;
        console.log('LISTAD CUENTAS');
        console.log(this.listadoCuentas);
      }
    } catch (error) {
      alert(error);
    }
  }

  ngOnInit(): void {
    this.dtOptions = this.loginService.dtOptions;
    this.cargarRegistros(this.idTipoFormulario);
    this.cargarListadosCuentasRol(this.tipoRol);
  }

  async verificarInvetarios(tipo: string) {
    switch (tipo) {
      case 'muebles':
        this.titulo = 'REGISTRO DE MUEBLES Y ENSERES';
        this.idTipoFormulario = '1';
        break;
      case 'maquinaria':
        this.titulo = 'REGISTRO DE MAQUINARIA ';
        this.idTipoFormulario = '2';

        break;
      case 'equiposComputacion':
        this.titulo = 'REGISTRO DE EQUIPOS DE COMPUTACIÓN';
        this.idTipoFormulario = '3';

        break;
      case 'equiposComunicacion':
        break;
      case 'materialEscritorio':
        this.titulo = 'REGISTRO DE MATERIAL DE ESCRITORIO';
        this.idTipoFormulario = '4';

        break;
      case 'cocina':
        break;
      case 'activosFijos':
        this.titulo = 'REGISTRO DE ACTIVOS FIJOS ';
        this.idTipoFormulario = '5';

        break;
      default:
        this.router.navigate(['/admin']);
        break;
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      fechaOrden: [this.metodosService.fechaActual(), [Validators.required]],
      tipoTrabajo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      costo: ['', [Validators.required]],
      fechaEntregaAprox: ['', [Validators.required]],
      observaciones: ['', [Validators.required]],
      tipoPago: ['', [Validators.required]],
      ci_persona: ['', [Validators.required]],
      a_paterno: ['', []],
      a_materno: ['', []],
      celular: ['', [Validators.required]],
      nombre: ['', []],
      direccion: ['', []],
      correo_electronico: ['', [Validators.required]],
      idPersonalAsignado: [''],
    });
  }

  async agregarRegistroVentas() {
    if (this.tituloModal == 'REGISTRAR') {
      let cliente: Cliente = {
        ci_persona: this.form.get('ci_persona')?.value.toString().toUpperCase(),
        a_paterno: this.form.get('a_paterno')?.value.toUpperCase(),
        a_materno: this.form.get('a_materno')?.value.toUpperCase(),
        celular: parseInt(this.form.get('celular')?.value),
        nombre: this.form.get('nombre')?.value.toUpperCase(),
        direccion: this.form.get('direccion')?.value.toUpperCase(),
        correo_electronico: this.form.get('correo_electronico')?.value,
      };
      let body: VentasDTO = {
        fechaOrden: this.form.get('fechaOrden')?.value.toUpperCase(),
        tipoTrabajo: this.form.get('tipoTrabajo')?.value.toUpperCase(),
        descripcion: this.form.get('descripcion')?.value.toUpperCase(),
        costo: parseInt(this.form.get('costo')?.value),
        fechaEntregaAprox: this.form
          .get('fechaEntregaAprox')
          ?.value.toUpperCase(),
        observaciones: this.form.get('observaciones')?.value.toUpperCase(),
        tipoPago: this.form.get('tipoPago')?.value.toUpperCase(),
        idPersonalAsignado: this.form.get('idPersonalAsignado')?.value,
        cliente: cliente,
      };
      try {
        let response: Response = await this.ventasService.agregarRegistroVentas(
          body
        );
        if (response.statusCode == 200) {
          Swal.fire({
            icon: 'success',
            title: 'Registro correcto',
            confirmButtonText: 'Entendido',
          }).then((result) => {
            window.location.reload();
          });
        }
      } catch (errores) {
        console.log('Errores');
        console.log(errores);
        this.errores = parsearErroresAPI(errores);
      }
    } else {
      this.editarOrdenTrabajo(this.bodyEditar);
    }
  }
  bodyEditar: any;
  async editarOrdenTrabajo(item: any) {
    console.log(item);

    try {
      let body = {
        idOrdenTrabajo: item.idOrdenTrabajo,
        idCliente: item.idCliente,
        tipoTrabajo: this.form.get('tipoTrabajo')?.value.toUpperCase(),
        descripcion: this.form.get('descripcion')?.value.toUpperCase(),
        costo: parseInt(this.form.get('costo')?.value),
        observaciones: this.form.get('observaciones')?.value.toUpperCase(),
        tipoPago: this.form.get('tipoPago')?.value.toUpperCase(),
        idPersonalAsignado: this.form.get('idPersonalAsignado')?.value,
        fechaEntregaAprox: item.fechaEntregaAprox,
        fechaOrden: item.fechaOrden,
        fechaCreacion: item.fechaCreacion,
        fechaModificacion: this.metodosService.fechaActual(),
      };
      this.ventasService.updateOrdenTrabajo(body, item.idOrdenTrabajo);
    } catch (error: any) {
      console.error(error);

      alert('Error al editar');
    }
  }
  tituloModal = 'REGISTRAR';
  async setearOrdenTrabajo(item: any) {
    console.log(item);
    this.tituloModal = 'EDITAR';
    let momentVariable = moment(item.fechaEntregaAprox, 'YYYY/MM/DD');
    let momentFinal = momentVariable.format('YYYY-MM-DD');

    let momentVariable1 = moment(item.fechaOrden, 'YYYY/MM/DD');
    let fechaOrden = momentVariable1.format('YYYY-MM-DD');

    this.form.get('tipoTrabajo')?.patchValue(item.tipoTrabajo);
    this.form.get('descripcion')?.patchValue(item.descripcion);
    this.form.get('costo')?.patchValue(item.costo);
    this.form.get('observaciones')?.patchValue(item.observaciones);
    this.form.get('tipoPago')?.patchValue(item.tipoPago);
    this.form.get('fechaOrden')?.patchValue(fechaOrden);
    this.form.get('fechaEntregaAprox')?.patchValue(momentFinal);
    this.bodyEditar = item;
  }

  async verOrdenTrabajo(item: any) {
    console.log(item);
  }

  setearPost() {
    this.tituloModal = 'REGISTRAR';
  }

cliente1:Cliente={
  ci_persona:         "",
  a_paterno:          "",
  a_materno:          "",
  celular:            0,
  nombre:             "",
  direccion:          "",
  correo_electronico: "",
}
  orden: VentasDTO={
    fechaOrden:       new Date,
    tipoTrabajo:       "",
    descripcion:       "",
    costo:             0,
    fechaEntregaAprox: new Date,
    observaciones:     "",
    tipoPago:          "",
    idPersonalAsignado:"",
    cliente:    this.cliente1
  };
  personalAsignado: PersonaInDto={
    ci_persona:         "",
    a_paterno:          "",
    a_materno:          "",
    celular:            0,
    nombre:             "",
    direccion:          "",
    correo_electronico: "",
  }
  async verOrdenCompleta(item: any) {
    console.log(item);
    let idCliente: number = item.idCliente;
    let idOrdenTrabajo: number = item.idOrdenTrabajo;
    let idPersonalAsignado: string = item.idPersonalAsignado;

    try {
      let response: any = await this.ventasService.obtenerListaOrdenes(
        idCliente,
        idOrdenTrabajo,
        idPersonalAsignado
      );
      if (response.statusCode == 200) {
        /* Orden */
        this.orden.tipoTrabajo = response.listaOrdenes[0].tipoTrabajo;
        this.orden.descripcion = response.listaOrdenes[0].descripcion;
        this.orden.costo = response.listaOrdenes[0].costo;
        this.orden.observaciones = response.listaOrdenes[0].observaciones;
        this.orden.tipoPago = response.listaOrdenes[0].tipoPago;
        this.orden.fechaEntregaAprox =
          response.listaOrdenes[0].fechaEntregaAprox;
        this.orden.fechaOrden = response.listaOrdenes[0].fechaOrden;
        /* cliente */
        this.orden.cliente.nombre =
          response.listaClientes[0].nombre +
          ' ' +
          response.listaClientes[0].a_paterno +
          ' ' +
          response.listaClientes[0].a_materno;
        this.orden.cliente.celular = response.listaClientes[0].celular;
        this.orden.cliente.correo_electronico =
          response.listaClientes[0].correo_electronico;
        this.orden.cliente.direccion = response.listaClientes[0].direccion;
        /* personalAsignado */
        this.personalAsignado.nombre =
          response.listaPersonalAsignado[0].nombre +
          ' ' +
          response.listaPersonalAsignado[0].a_paterno +
          ' ' +
          response.listaPersonalAsignado[0].a_materno;
        this.personalAsignado.celular = response.listaPersonalAsignado[0].celular;
        this.personalAsignado.correo_electronico =
          response.listaPersonalAsignado[0].correo_electronico;
      }
    } catch (error: any) {}
  }

  /*
  async eliminarRegsitro(item: any) {
    try {
      let response: Response =
        await this.inventariosService.eliminarRegistroInventario(item.codigo);
      if (response.statusCode == 200) {
        console.log('Response');
        console.log(JSON.stringify(response));
        Swal.fire({
          icon: 'success',
          title: 'Registro eliminado',
          confirmButtonText: 'Entendido',
        }).then((result) => {
          window.location.reload();
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'warning',
        title: 'Incorrecto',
        text: 'Se produjo un error',
        confirmButtonText: 'Entendido',
      }).then((result) => {});
    }
  } */

  //TODO: GENERAR REPORTES DE UN INVENTARIO

  /*   async generarReporteInventario() {
    try {
      let response: Response =
        await this.inventariosService.generarReporteInventario(
          this.idTipoFormulario
        );
      if (response.statusCode == 200) {
        console.log('Response');
        console.log(JSON.stringify(response));
        this.base64 = 'data:application/pdf;base64,' + response.datos;
        Swal.fire({
          icon: 'success',
          title: 'El reporte fue generado',
          confirmButtonText: 'Descargar',
        }).then((result) => {
          this.downloadPdf();
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'warning',
        title: 'Incorrecto',
        text: 'Se produjo un error',
        confirmButtonText: 'Entendido',
      }).then((result) => {});
    }
  } */
  /*   base64: any;
  async downloadPdf() {
    const linkSource = this.base64;
    const downloadLink = document.createElement('a');
    const fileName = 'REPORTE - ' + this.titulo + '.pdf';
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  } */

  ngOnDestroy(): void {
    // this.suscription.unsubscribe();
    this.dtTrigger.unsubscribe();
  }
}
