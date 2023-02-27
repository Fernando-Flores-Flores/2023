import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {
  apiURL = environment.apiURL + 'Inventario';
  apiURLCatalogo = environment.apiURL + 'Catalogo';
  constructor(private HttpClient: HttpClient)  { }

  async obtenerListaCatalogos(estado: string="all",tipoCatalogo: string="all") {
    //const headers = new HttpHeaders('Content-Type: application/json');
    let params = new HttpParams();
    params = params.append('estado', estado);
    params = params.append('tipo', tipoCatalogo);
    return await lastValueFrom(
      this.HttpClient.get<any>(`${this.apiURLCatalogo}/listarCatalogos`, {
        params,
      })
    );
  }

  async InsertarCatalogo(body: any) {
    const formData = this.construirFormData(body);
    return await lastValueFrom(
      this.HttpClient.post<any>(`${this.apiURLCatalogo}/CrearCatalogo`, formData)
    );
  }
  construirFormData(body: any): FormData {
    const formData = new FormData();
    formData.append('nombre', body.nombre);
    formData.append('descripcion', body.descripcion);
    formData.append('tipocatalogo', body.tipocatalogo);
    if (body.foto) {
      formData.append('foto', body.foto);
    }
    return formData;
  }
}
