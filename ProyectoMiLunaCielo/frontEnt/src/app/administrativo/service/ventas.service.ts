import { Injectable } from '@angular/core';
import { VentasDTO } from 'src/app/Model/ventas';
import { lastValueFrom } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class VentasService {
  apiURL = environment.apiURL + 'OrdenTrabajo';
  apiURLReportes = environment.apiURL + 'ReportesPDF';
  constructor(private HttpClient: HttpClient) {}
  /* https://localhost:7207/api/OrdenTrabajo/listaOrdenes?idCliente=0&idOrdenTrabajo=0&idPersonalAsignado=defecto */
  async obtenerListaOrdenes(
    idCliente: number = 0,
    idOrdenTrabajo: number = 0,
    idPersonalAsignado: string = 'defecto'
  ) {
    let params = new HttpParams();
    params = params.append('idCliente', idCliente);
    params = params.append('idOrdenTrabajo', idOrdenTrabajo);
    params = params.append('idPersonalAsignado', idPersonalAsignado);
    return await lastValueFrom(
      this.HttpClient.get<any>(`${this.apiURL}/listaOrdenes`, {
        params,
      })
    );
  }

  async agregarRegistroVentas(body: VentasDTO) {
    return await lastValueFrom(
      this.HttpClient.post<any>(`${this.apiURL}/CrearOrdenTrabajo`, body)
    );
  }

  async updateOrdenTrabajo(body: any, id: number) {
    return await lastValueFrom(
      this.HttpClient.put<any>(`${this.apiURL}/` + id, body)
    );
  }
}
