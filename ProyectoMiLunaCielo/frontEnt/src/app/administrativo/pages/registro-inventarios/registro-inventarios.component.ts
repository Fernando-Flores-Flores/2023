import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject, Subscription } from "rxjs";
import { InventariosService } from "../../service/inventarios.service";
import { LoginService } from "../../service/login.service";
import { UsuariosService } from "../../service/usuarios.service";

@Component({
  selector: "app-registro-inventarios",
  templateUrl: "./registro-inventarios.component.html",
  styleUrls: ["./registro-inventarios.component.scss"],
})
export class RegistroInventariosComponent implements OnInit {
  titulo: any = "";
  suscription!: Subscription;
  constructor(
    private inventariosService: InventariosService,
    private loginService: LoginService,
    private routerActivated: ActivatedRoute,
    private router: Router
  ) {
    this.suscription = this.inventariosService
      .obtenerListaInventarios()
      .subscribe((resp: any) => {
        this.verificarInvetarios(
          this.routerActivated.snapshot.paramMap.get("parametro")!
        );
        this.listaUsuarios = resp.listaDatos;
        this.dtTrigger.next();
      });
  }
  listaUsuarios: any = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: any = new Subject<any>();
  ngOnInit(): void {
    this.dtOptions = this.loginService.dtOptions;
  }

  verificarInvetarios(tipo: string) {
    switch (tipo) {
      case "muebles":
        this.titulo = "REGISTRO DE MUEBLES";
        break;
      case "maquinaria":
        this.titulo = "REGISTRO DE MAQUINARIA ";
        break;
      case "equiposComputacion":
        this.titulo = "REGISTRO DE EQUIPOS DE COMPUTACIÓN";
        break;
      case "equiposComunicacion":
        break;
      case "materialEscritorio":
        this.titulo = "REGISTRO DE MATERIAL DE ESCRITORIO";
        break;
      case "cocina":
        break;
      case "activosFijos":
        this.titulo = "REGISTRO DE ACTIVOS FIJOS ";
        break;
      default:
        this.router.navigate(["/admin"]);
        break;
    }
  }
  ngOnDestroy(): void {
    this.suscription.unsubscribe();
    this.dtTrigger.unsubscribe();
  }
}
