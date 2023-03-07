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
      this.obtenerTodasNotificaciones(this.idUsuario,false);
    } catch (error: any) {}
  }
  async obtenerTodasNotificaciones(idUsuario: string,leido:boolean) {
    let response: any =
      await this.notificacionesService.obtenerTodasNotificaciones(idUsuario,leido);
    this.listaNotificaciones = response.datos;
    console.log(this.listaNotificaciones);
    /*   if (response.statusCode == 200) {
      this.usuariosService.obtenerPersona('');
    } */
  }

  async obtenerNotificacionesLeidoONO(leido: any=null) {
    this.listaNotificaciones = [];
    let id = this.idUsuario;
    let response: any =
      await this.notificacionesService.obtenerTodasNotificaciones(id, leido);
    this.listaNotificaciones = response.datos;
    console.log(this.listaNotificaciones);
  }
}
