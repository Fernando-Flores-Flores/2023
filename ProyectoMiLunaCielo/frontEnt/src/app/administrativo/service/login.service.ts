import { Injectable } from '@angular/core';
import { credencialesUsuario, PersonaInDto, usuarioDTO } from 'src/app/Model/auth';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { Observable } from 'rxjs';
import { respuestaAutenticacion } from '../../Model/auth';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  dtOptions: DataTables.Settings = {};
  apiURL = environment.apiURL + 'Cuentas';
  constructor(private HttpClient: HttpClient, private router: Router) {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      language: {
        url: '../../../../assets/data/cdn-datatables.json',
      },
      // scrollX: true,
      processing: true,
      deferRender: true,
      destroy: true,
    };
  }

  estalogeado(): boolean {
    const token = localStorage.getItem(this.llaveToken);
    if (!token) {
      return false;
    }
    const expiracion = localStorage.getItem(this.llaveExpiracion) || '';
    const expiracionFecha = new Date(expiracion);

    if (expiracionFecha <= new Date()) {
      this.logout();
      return false;
    }
    return true;
  }

  registrar(
    credencialesUsuario: credencialesUsuario
  ): Observable<respuestaAutenticacion> {
    return this.HttpClient.post<respuestaAutenticacion>(
      this.apiURL + '/crear',
      credencialesUsuario
    );
  }

  login(
    credencialesUsuario: credencialesUsuario
  ): Observable<respuestaAutenticacion> {
    return this.HttpClient.post<respuestaAutenticacion>(
      this.apiURL + '/login',
      credencialesUsuario
    );
  }

  private readonly llaveToken = 'token';
  private readonly llaveExpiracion = 'token-expiracion';
  private readonly campoRol = 'role';

  guardarToken(respuestaAutenticacion: respuestaAutenticacion) {
    localStorage.setItem(this.llaveToken, respuestaAutenticacion.token);
    localStorage.setItem(
      this.llaveExpiracion,
      respuestaAutenticacion.expiracion.toString()
    );
  }
  logout() {
    localStorage.removeItem(this.llaveToken);
    localStorage.removeItem(this.llaveExpiracion);
    this.router.navigate(['/']);
  }

  //Obtener el capo ROL
  obtenerRol(): string {
    let rol = this.obtenerCampoJWT(this.campoRol);
    return rol;
  }

  //Obtener los datos del token
  obtenerCampoJWT(campo: string): string {
    const token = localStorage.getItem(this.llaveToken);
    if (!token) {
      return '';
    }
    var dataToken = JSON.parse(atob(token.split('.')[1]));
    return dataToken[campo];
  }

  obtenerUsuarios(pagina: number, recordsPorPagina: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('recordsPorPagina', recordsPorPagina.toString());
    return this.HttpClient.get<usuarioDTO[]>(`${this.apiURL}/listadoUsuarios`, {
      observe: 'response',
      params,
    });
  }

  asignarRol(usuarioId: string, rol: string) {
    const headers = new HttpHeaders('Content-Type: application/json');
    let params = new HttpParams();
    params = params.append('rol', rol.toString());
    return this.HttpClient.post(
      `${this.apiURL}/asignarRol`,
      JSON.stringify(usuarioId),
      { headers, params }
    );
  }

  async asignarRolJS(usuarioId: string, rol: string) {
    const headers = new HttpHeaders('Content-Type: application/json');
    let params = new HttpParams();
    params = params.append('rol', rol.toString());
    return await lastValueFrom(
      this.HttpClient.post<any>(
        `${this.apiURL}/asignarRol`,
        JSON.stringify(usuarioId),
        { headers, params }
      )
    );
  }



  removerAdmin(usuarioId: string) {
    const headers = new HttpHeaders('Content-Type: application/json');
    return this.HttpClient.post(
      `${this.apiURL}/removerAdmin`,
      JSON.stringify(usuarioId),
      { headers }
    );
  }
}
