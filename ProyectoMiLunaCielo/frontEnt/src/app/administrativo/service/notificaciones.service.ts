import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  apiURL = environment.apiURL + 'Notificaciones';
  apiURLReportes = environment.apiURL + 'listaNotificaciones';

  constructor(private HttpClient: HttpClient) {}

  async obtenerTodasNotificaciones(idUsuario: string,leido:boolean) {
    let params = new HttpParams();
    params = params.append('idUsuario', idUsuario);
    params = params.append('leido', leido);
    return await lastValueFrom(
      this.HttpClient.get<any>(`${this.apiURL}/listaNotificaciones`, {
        params,
      })
    );
  }
}
