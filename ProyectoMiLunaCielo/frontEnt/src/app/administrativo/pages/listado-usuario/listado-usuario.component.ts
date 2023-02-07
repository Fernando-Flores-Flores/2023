import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { UsuariosService } from '../../service/usuarios.service';
import { Subject } from 'rxjs';
import { LoginService } from '../../service/login.service';
import { HttpResponse } from '@angular/common/http';
import { usuarioDTO } from 'src/app/Model/auth';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-listado-usuario',
  templateUrl: './listado-usuario.component.html',
  styleUrls: ['./listado-usuario.component.scss'],
})
export class ListadoUsuarioComponent implements OnDestroy, OnInit {
  constructor(
    private usuariosService: UsuariosService,
    private loginService: LoginService
  ) {}
  listaUsuarios: any = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: any = new Subject<any>();
  itemUsuario:any;
  ngOnInit(): void {
    this.dtOptions = this.loginService.dtOptions;
    /*     this.usuariosService.obtenerListaUsuarios().subscribe((resp: any) => {
      this.listaUsuarios = resp.listaDatos;
      this.dtTrigger.next();
    }); */
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  @ViewChild('table')
  //table: MatTable<any>;
  //usuarios: usuarioDTO[] | null;
  usuarios: any;

  columnasAMostrar = ['nombre', 'acciones'];
  cantidadTotalRegistros: any;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 100;
  rol: string = '';
  async cargarRegistros(pagina: number, cantidadElementosAMostrar: any) {
    await this.loginService
      .obtenerUsuarios(pagina, cantidadElementosAMostrar)
      .subscribe(
        (respuesta: any) => {
          this.cantidadTotalRegistros = respuesta.headers.get(
            'cantidadTotalRegistros'
          );
          console.log('LISTA');

          this.listaUsuarios = respuesta.body.datos;

          console.log(this.listaUsuarios);
          this.dtTrigger.next();
        },
        (error) => console.error(error)
      );
  }

  /*   actualizarPaginacion(datos: PageEvent){
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadRegistrosAMostrar = datos.pageSize;
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
  } */

  async asignarRol(usuarioId: string, rol: string) {
    try {
      let res: any = await this.loginService.asignarRolJS(usuarioId, rol);
      if (res.statusCode == 200) {
        this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);

        Swal.fire({
          icon: 'success',
          title: res.mensajeRespuesta,
          text: 'La operación se ha realizado',
          confirmButtonText: 'Entiendo',
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      } else {
      }
    } catch (error: any) {
      console.error(error);
      Swal.fire('Ocurrió un error', 'La operación se ha realizado', 'success');
    }
  }

  removerAdmin(usuarioId: string) {
    this.loginService.removerAdmin(usuarioId).subscribe(
      (resp: any) => {
        Swal.fire('Exitoso', 'La operación se ha realizado', 'success');
        console.log(resp);

        this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  cambiarRol() {
    this.asignarRol(this.itemUsuario.id, this.rol);
  }

  envioItem(item:any){
    this.itemUsuario=item;

  }
}
