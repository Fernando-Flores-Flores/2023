import { Component, OnInit } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { InventariosService } from "../../service/inventarios.service";
import { LoginService } from "../../service/login.service";

@Component({
  selector: "app-registro-orden-trabajo",
  templateUrl: "./registro-orden-trabajo.component.html",
  styleUrls: ["./registro-orden-trabajo.component.scss"],
})
export class RegistroOrdenTrabajoComponent implements OnInit {
  listaProductos: any = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: any = new Subject<any>();
  suscription!: Subscription;

  constructor(
    private loginService: LoginService,
    private inventariosService: InventariosService
  ) {
    this.suscription = this.inventariosService
      .obtenerListaInventarios()
      .subscribe((resp: any) => {
        this.listaProductos = resp.listaDatos;
        this.dtTrigger.next();
      });
  }

  ngOnInit(): void {
    this.dtOptions = this.loginService.dtOptions;
  }
  ngOnDestroy(): void {
    this.suscription.unsubscribe();
    this.dtTrigger.unsubscribe();
  }
}
