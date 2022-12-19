import { Component, OnInit, OnDestroy } from "@angular/core";
import { UsuariosService } from "../../service/usuarios.service";
import { Subject } from "rxjs";
import { LoginService } from "../../service/login.service";
@Component({
  selector: "app-listado-usuario",
  templateUrl: "./listado-usuario.component.html",
  styleUrls: ["./listado-usuario.component.scss"],
})
export class ListadoUsuarioComponent implements OnDestroy, OnInit {
  constructor(
    private usuariosService: UsuariosService,
    private loginService: LoginService
  ) {}
  listaUsuarios: any = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: any = new Subject<any>();
  ngOnInit(): void {
    this.dtOptions = this.loginService.dtOptions;
    this.usuariosService.obtenerListaUsuarios().subscribe((resp: any) => {
      console.log("PPPPPPPPPPPPPPP");
      console.log("PPPPPPPPPPPPPPP");
      console.log("PPPPPPPPPPPPPPP");

      console.log(resp);
      console.log("PPPPPPPPPPPPPPP");
      console.log("PPPPPPPPPPPPPPP");
      console.log("PPPPPPPPPPPPPPP");
      this.listaUsuarios = resp.listaDatos;
      // Calling the DT trigger to manually render the table
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
