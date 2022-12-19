import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class UsuariosService {
  constructor(private http: HttpClient) {}
  obtenerListaUsuarios() {
    return this.http.get<any>("assets/data/usuarios.json");
  }
}
