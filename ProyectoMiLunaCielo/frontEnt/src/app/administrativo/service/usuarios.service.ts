import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { PersonaInDto } from 'src/app/Model/auth';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  apiURL = environment.apiURL + 'Cuentas';
  //piURLlistadoUsuarios = environment.apiURL + 'listadoUsuarios';

  constructor(private HttpClient: HttpClient) {}

  async obtenerListaCuentas(valorRol: string = '') {
    let params = new HttpParams();
    params = params.append('rol', valorRol);
    return await lastValueFrom(
      this.HttpClient.get<any>(`${this.apiURL}/listadoUsuarios`, {
        params,
      })
    );
  }

  async CrearCuentaUsuario(body: PersonaInDto) {
    //const headers = new HttpHeaders('Content-Type: application/json');
    //let params = new HttpParams();
    //params = params.append('rol', rol.toString());
    //return await lastValueFrom(
    //this.HttpClient.post<any>(`${this.apiURL}/CrearCuentaUsuario`, body)
    //);
    const formData = this.construirFormData(body);
    return await lastValueFrom(
      this.HttpClient.post<any>(`${this.apiURL}/CrearCuentaUsuario`, formData)
    );
  }

  construirFormData(body: PersonaInDto): FormData {
    const formData = new FormData();
    formData.append('ci_persona', body.ci_persona);
    formData.append('a_paterno', body.a_paterno);
    formData.append('a_materno', body.a_materno);
    formData.append('celular', body.celular?.toString());
    formData.append('nombre', body.nombre);
    formData.append('direccion', body.direccion);
    formData.append('correo_electronico', body.correo_electronico);
    if (body.foto) {
      formData.append('foto', body.foto);
    }
    return formData;
  }

  async getImage(imageUrl: string) {
    return await lastValueFrom(
      this.HttpClient.get(imageUrl, { responseType: 'blob' })
    );
  }
  getImage1(imageUrl: string) {
    return this.HttpClient.get(imageUrl, { responseType: 'blob' });
  }
}
