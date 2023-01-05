import { Injectable } from "@angular/core";
import { credencialesUsuario } from "src/app/Model/auth";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { Observable } from "rxjs";
import { respuestaAutenticacion } from '../../Model/auth';

@Injectable({
  providedIn: "root",
})
export class LoginService {
  dtOptions: DataTables.Settings = {};
  apiURL = environment.apiURL + 'Cuentas'
  constructor(private HttpClient:HttpClient) {
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 5,
      language: {
        url: "../../../../assets/data/cdn-datatables.json",
      },
    };
  }

  registrar(credencialesUsuario:credencialesUsuario):Observable<respuestaAutenticacion>{
    return this.HttpClient.post<respuestaAutenticacion>(this.apiURL+'/crear',credencialesUsuario);

  }
}
