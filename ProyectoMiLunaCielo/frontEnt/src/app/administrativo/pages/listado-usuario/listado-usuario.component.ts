import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { UsuariosService } from "../../service/usuarios.service";
import { Subject } from "rxjs";
import { LoginService } from "../../service/login.service";
import { HttpResponse } from "@angular/common/http";
import { usuarioDTO } from "src/app/Model/auth";
import Swal from "sweetalert2";
@Component({
  selector: "app-listado-usuario",
  templateUrl: "./listado-usuario.component.html",
  styleUrls: ["./listado-usuario.component.scss"],
})
export class ListadoUsuarioComponent implements OnDestroy, OnInit {
  constructor(
    private usuariosService: UsuariosService,
    private loginService: LoginService
  ) {}
  listaUsuarios: any = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: any = new Subject<any>();
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

  usuarios: usuarioDTO[] | null;
  columnasAMostrar = ['nombre', 'acciones'];
  cantidadTotalRegistros:any;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 100;


  cargarRegistros(pagina: number, cantidadElementosAMostrar:any){
    this.loginService.obtenerUsuarios(pagina, cantidadElementosAMostrar)
    .subscribe((respuesta: HttpResponse<usuarioDTO[]>) => {
      this.usuarios = respuesta.body;
      this.cantidadTotalRegistros = respuesta.headers.get("cantidadTotalRegistros");
      console.log(respuesta);
      this.listaUsuarios = respuesta.body;
      this.dtTrigger.next();
    }, error => console.error(error));
  }

/*   actualizarPaginacion(datos: PageEvent){
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadRegistrosAMostrar = datos.pageSize;
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
  } */

  hacerAdmin(usuarioId: string){
    console.log(usuarioId);
    this.loginService.hacerAdmin(usuarioId)
    .subscribe(() => Swal.fire('Exitoso', 'La operación se ha realizado', 'success'));
  }

  removerAdmin(usuarioId: string){
    this.loginService.removerAdmin(usuarioId)
    .subscribe(() => Swal.fire('Exitoso', 'La operación se ha realizado', 'success'));
  }
}
