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
    return await lastValueFrom(
      this.HttpClient.post<any>(`${this.apiURL}/CrearCuentaUsuario`, body)
    );
  }

  obtenerListaUsuarios() {
    return this.HttpClient.get<any>('assets/data/usuarios.json');
  }
}
