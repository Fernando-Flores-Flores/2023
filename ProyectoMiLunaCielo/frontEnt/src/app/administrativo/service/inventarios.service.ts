import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class InventariosService {
  constructor(private http: HttpClient) {}
  obtenerListaInventarios() {
    return this.http.get<any>("assets/data/inventarioActivos.json");
  }
}
