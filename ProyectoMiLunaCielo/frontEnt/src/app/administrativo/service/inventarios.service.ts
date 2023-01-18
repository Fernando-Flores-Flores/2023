import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { InventarioDto } from 'src/app/Model/inventario';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class InventariosService {
  apiURL = environment.apiURL + 'Inventario';
  apiURLReportes = environment.apiURL + 'ReportesPDF';

  constructor(private HttpClient: HttpClient) {}
  obtenerListaInventarios() {
    return this.HttpClient.get<any>('assets/data/inventarioActivos.json');
  }
  async obtenerListaInventariosV2(tipoFormulario: string) {
    //const headers = new HttpHeaders('Content-Type: application/json');
    let params = new HttpParams();
    params = params.append('tipoFormulario', tipoFormulario);
    return await lastValueFrom(
      this.HttpClient.get<any>(`${this.apiURL}/listarInventario`, {
        params,
      })
    );
  }

  async generarReporteInventario(tipoFormulario: string) {
    //const headers = new HttpHeaders('Content-Type: application/json');
    let params = new HttpParams();
    params = params.append('tipoFormulario', tipoFormulario);

    return await lastValueFrom(
      this.HttpClient.get<any>(`${this.apiURLReportes}/generarPDF`, {
        params,
      })
    );
  }

  async agregarRegistroInventario(body: InventarioDto) {
    return await lastValueFrom(
      this.HttpClient.post<any>(`${this.apiURL}/CrearInventario`, body)
    );
  }

  async eliminarRegistroInventario(codigo: any) {
    let params = new HttpParams();
    params = params.append('codigo', codigo);
    return await lastValueFrom(
      this.HttpClient.delete<any>(`${this.apiURL}/BorrarRegistroInventario`, {
        params,
      })
    );
  }
}
