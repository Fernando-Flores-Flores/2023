import { Component, OnInit } from '@angular/core';
import { EnvioDatosEntreComponentesService } from '../../service/envio-datos-entre-componentes.service';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.scss'],
})
export class HeaderAdminComponent implements OnInit {
  constructor(
    public loginService: LoginService,
    private envioDatos: EnvioDatosEntreComponentesService
  ) {}
  rolUsuario = '';
  async ngOnInit() {
    try {
 /*      await this.envioDatos.currentMessage.subscribe(
        (message) =>{
          this.rolUsuario = message;
          console.log("WWWWWWWWWWWWWWWWWDDDDDD");
          console.log("WWWWWWWWWWWWWWWWWDDDDDD");
          console.log("WWWWWWWWWWWWWWWWWDDDDDD");

          console.log(this.rolUsuario);
          console.log("WWWWWWWWWWWWWWWWWDDDDDD");
          console.log("WWWWWWWWWWWWWWWWWDDDDDD");
          console.log("WWWWWWWWWWWWWWWWWDDDDDD");

        }
      ); */
      this.rolUsuario = await this.loginService.obtenerCampoJWT('role');
    } catch (error) {
      console.error(error);
    }
  }
  logout() {
    this.loginService.logout();
  }
}
