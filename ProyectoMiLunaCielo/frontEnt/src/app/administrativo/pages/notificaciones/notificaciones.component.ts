import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginService } from '../../service/login.service';
import { NotificacionesService } from '../../service/notificaciones.service';
import { UsuariosService } from '../../service/usuarios.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.scss'],
})
export class NotificacionesComponent implements OnInit {
  titulo: string = 'NOTIFICACIONES';
  apiURL = environment.apiURL + 'Notificaciones';
  apiURLReportes = environment.apiURL + 'listaNotificaciones';
  idUsuario: any;
  listaNotificaciones: any = [];
  constructor(
    private notificacionesService: NotificacionesService,
    public loginService: LoginService,
    private usuariosService: UsuariosService
  ) {}

  async ngOnInit() {
    try {
      this.idUsuario = await this.loginService.obtenerCampoJWT('Id');
      this.obtenerTodasNotificaciones(this.idUsuario, false);
    } catch (error: any) {}
  }
  async obtenerTodasNotificaciones(idUsuario: string, leido: boolean) {
    let response: any =
      await this.notificacionesService.obtenerTodasNotificaciones(
        idUsuario,
        leido
      );
    this.listaNotificaciones = response.datos;
    console.log(this.listaNotificaciones);
    /*   if (response.statusCode == 200) {
      this.usuariosService.obtenerPersona('');
    } */
  }

  async obtenerNotificacionesLeidoONO(leido: any = null) {
    this.listaNotificaciones = [];
    let id = this.idUsuario;
    let response: any =
      await this.notificacionesService.obtenerTodasNotificaciones(id, leido);
    this.listaNotificaciones = response.datos;
    console.log(this.listaNotificaciones);
  }

  tituloNotifi: string;
  fechaCreacion: string;
  fechaleido: string;
  leido: boolean;
  mensaje: string;
  foto: any;
  /*   fechaCreacion:"2023-03-13T00:23:41.199896Z"
fechaleido:null
foto:"data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAl
idUsuarioEnvia:"ffa376f1-1fd9-4110-8823-844c5d8573d9"
idUsuarioRecibe:"66b7e321-1acd-4b29-b3c0-4bbf0403cdea"
leido:false
mensaje:"Se le asigno un trabajo con fecha de entrega el : 2023-05-05"
nombre:"JOSELUIS FLORES MAMANI" */

  mostrarNotificacionModal(item: any) {
    console.log(item);
    this.tituloNotifi=item.nombre;
    this.fechaCreacion=item.fechaCreacion;
    this.foto=item.foto;
    this.mensaje=item.mensaje;
    this.leido=true;



  }
}
