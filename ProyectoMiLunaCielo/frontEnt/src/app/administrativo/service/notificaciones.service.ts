import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificacionesService {
  apiURL = environment.apiURL + 'Notificaciones';
  apiURLReportes = environment.apiURL + 'listaNotificaciones';

  constructor(private HttpClient: HttpClient) {}

  async obtenerTodasNotificaciones(idUsuario: string, leido: any = null) {
    let params = new HttpParams();
    params = params.append('idUsuario', idUsuario);
    params = params.append('leido', leido);
    // leido!=null? params = params.append('leido', leido):console.log();
    return await lastValueFrom(
      this.HttpClient.get<any>(`${this.apiURL}/listaNotificaciones`, {
        params,
      })
    );
  }

  async envioNotificaciones(
    mensaje: string,
    idUsuarioEnvia: string,
    idUsuarioRecibe: string
  ) {
    const url = `${this.apiURL}/EnviarNotificacion`;
    let body = {
      mensaje: mensaje,
      idUsuarioEnvia: idUsuarioEnvia,
      idUsuarioRecibe: idUsuarioRecibe,
    };
    /*     const params = new HttpParams()
      .set('mensaje', mensaje)
      .set('idUsuarioEnvia', idUsuarioEnvia)
      .set('idUsuarioRecibe', idUsuarioRecibe); */
    const response = await this.HttpClient.post<any>(url, body).toPromise();
    return response;
  }
}
