import { Injectable } from '@angular/core';
import { VentasDTO } from 'src/app/Model/ventas';
import { lastValueFrom } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class VentasService {
  apiURL = environment.apiURL + 'OrdenTrabajo';
  apiURLReportes = environment.apiURL + 'ReportesPDF';
  constructor(private HttpClient: HttpClient) {}

  async obtenerListaOrdenes(idCliente: number=0) {
    let params = new HttpParams();
    params = params.append('idCliente', idCliente);
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


  async updateOrdenTrabajo(body: any,id:number) {
    return await lastValueFrom(
      this.HttpClient.put<any>(`${this.apiURL}/OrdenTrabajo/`+id, body)
    );
  }
}
