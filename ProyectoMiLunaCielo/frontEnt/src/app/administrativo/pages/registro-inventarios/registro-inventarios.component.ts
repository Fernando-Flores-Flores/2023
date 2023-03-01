import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { InventarioDto, Response } from 'src/app/Model/inventario';
import Swal from 'sweetalert2';
import { InventariosService } from '../../service/inventarios.service';
import { LoginService } from '../../service/login.service';
import { DataTableDirective } from 'angular-datatables';
declare var $: any;

@Component({
  selector: 'app-registro-inventarios',
  templateUrl: './registro-inventarios.component.html',
  styleUrls: ['./registro-inventarios.component.scss'],
})
export class RegistroInventariosComponent implements OnInit {
  titulo: any = '';
  idTipoFormulario: string = '';
  suscription!: Subscription;
  listaUsuarios: any = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: any = new Subject<any>();
  form: FormGroup;
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  constructor(
    private inventariosService: InventariosService,
    private loginService: LoginService,
    private routerActivated: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
    this.dtTrigger.next();
  }
  async cargarRegistros(idTipoInventario: string) {
    let response: Response =
      await this.inventariosService.obtenerListaInventariosV2(idTipoInventario);
    if (response.statusCode == 200) {
      this.listaUsuarios = response.datos;
      this.dtTrigger.next();
    }
  }

  ngOnInit(): void {
    this.dtOptions = this.loginService.dtOptions;
    this.verificarInvetarios(
      this.routerActivated.snapshot.paramMap.get('parametro')!
    );
    this.cargarRegistros(this.idTipoFormulario);
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
        this.titulo = 'REGISTRO DE EQUIPOS DE COMPUTACIÓN Y COMUNICACIÓN';
        this.idTipoFormulario = '3';
        break;

      case 'materialEscritorio':
        this.titulo = 'REGISTRO DE MATERIAL DE ESCRITORIO';
        this.idTipoFormulario = '4';
        break;
      case 'activosFijos':
        this.titulo = 'REGISTRO DE ACTIVOS FIJOS ';
        this.idTipoFormulario = '5';
        break;
      case 'consumibles':
        this.titulo = 'CONSUMIBLES';
        this.idTipoFormulario = '6';
        break;
      case 'cocina':
        this.titulo = 'REGISTRO DE ACTIVOS COCINA ';
        this.idTipoFormulario = '7';
        break;
      default:
        this.router.navigate(['/admin']);
        break;
    }
  }
  private buildForm() {
    this.form = this.formBuilder.group({
      idtipoInventario: [this.idTipoFormulario, [Validators.required]],
      codigo: ['', []],
      cantidad: ['', [Validators.required]],
      oficina: ['', []],
      descripcion: ['', [Validators.required]],
      observaciones: ['', [Validators.required]],
      area: ['PRODUCCION', [Validators.required]],
      fechaCreacion: [null, []],
      fechaModificacion: [null, []],
      estado: ['ACTIVO', []],
    });
  }

  async agregarRegistroInventario() {
    let body: InventarioDto = {
      idtipoInventario: this.idTipoFormulario,
      codigo: this.form.get('codigo')?.value,
      cantidad: parseInt(this.form.get('cantidad')?.value),
      oficina: this.form.get('oficina')?.value.toUpperCase(),
      descripcion: this.form.get('descripcion')?.value.toUpperCase(),
      observaciones: this.form.get('observaciones')?.value.toUpperCase(),
      area: this.form.get('area')?.value.toUpperCase(),
      fechaCreacion: this.form.get('fechaCreacion')?.value,
      fechaModificacion: this.form.get('fechaModificacion')?.value,
      estado: this.form.get('estado')?.value.toUpperCase(),
    };
    try {
      let response: Response =
        await this.inventariosService.agregarRegistroInventario(body);
      if (response.statusCode == 200) {
        console.log('Response');
        console.log(JSON.stringify(response));
        Swal.fire({
          icon: 'success',
          title: 'Registro correcto',
          confirmButtonText: 'Entendido',
        }).then(async (result: any) => {
          let response: Response =
            await this.inventariosService.obtenerListaInventariosV2(
              this.idTipoFormulario
            );
          if (response.statusCode == 200) {
            this.listaUsuarios = response.datos;
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.draw();
            });
          }
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
  }
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
  }

  //TODO: GENERAR REPORTES DE UN INVENTARIO

  async generarReporteInventario() {
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
  }
  base64: any;
  async downloadPdf() {
    const linkSource = this.base64;
    const downloadLink = document.createElement('a');
    const fileName = 'REPORTE - ' + this.titulo + '.pdf';
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  ngOnDestroy(): void {
    //this.suscription.unsubscribe();
    this.dtTrigger.unsubscribe();
  }
}
