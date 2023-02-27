import { CatalogoService } from './../../../pagina-web/services/catalogo.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { LoginService } from '../../service/login.service';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-registro-catalogos',
  templateUrl: './registro-catalogos.component.html',
  styleUrls: ['./registro-catalogos.component.scss'],
})
export class RegistroCatalogosComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: any = new Subject<any>();
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  listaCatalogo: any = [];
  titulo = 'INSERTAR REGISTROS AL CATALOGO';
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private catalogoService: CatalogoService,
    private loginService: LoginService
  ) {
    this.buildForm();
    this.dtTrigger.next();
  }

  ngOnInit(): void {
    this.dtOptions = this.loginService.dtOptions;
    this.cargarRegistros('all', 'all');
  }
  async cargarRegistros(estado: string, tipoCatalogo: string) {
    let response: any = await this.catalogoService.obtenerListaCatalogos(
      estado,
      tipoCatalogo
    );
    if (response.statusCode == 200) {
      this.listaCatalogo = response.datos;
      this.dtTrigger.next();
    }
  }

  async insertarCatalogo() {
    try {
      if (this.form.valid) {
        let body = this.form.value as ICatalogo;
        let response: any = await this.catalogoService.InsertarCatalogo(body);

        if (response.statusCode == 200) {
          Swal.fire({
            icon: 'success',
            title: 'Se realizo el registro',
            confirmButtonText: 'Entendido',
          }).then(async (result: any) => {
            let response: any =
              await this.catalogoService.obtenerListaCatalogos('all', 'all');
            if (response.statusCode == 200) {
              this.listaCatalogo = response.datos;
              this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.draw();
              });
            }
          });
        }
      } else {
        this.form.markAllAsTouched();
        console.error('Complete el formulario');
        Swal.fire({
          icon: 'warning',
          title: 'Complete los datos requeridos',
          confirmButtonText: 'Entendido',
        }).then(async (result) => {});
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
  private buildForm() {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      foto: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      tipocatalogo: ['', [Validators.required]],
    });
  }

  imagenCambiada = false;
  archivoSeleccionado(file: any) {
    this.imagenCambiada = true;
    this.form.get('foto')?.setValue(file);
  }
}
export interface ICatalogo {
  nombre: string;
  descripcion: string;
  tipocatalogo: string;
  foto?: File;
}
