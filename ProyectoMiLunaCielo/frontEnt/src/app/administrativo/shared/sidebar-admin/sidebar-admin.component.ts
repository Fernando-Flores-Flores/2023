import { Component, OnInit } from '@angular/core';
import { EnvioDatosEntreComponentesService } from '../../service/envio-datos-entre-componentes.service';
import { LoginService } from '../../service/login.service';
import { UsuariosService } from '../../service/usuarios.service';

@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar-admin.component.html',
  styleUrls: ['./sidebar-admin.component.scss'],
})
export class SidebarAdminComponent implements OnInit {
  nombreUsuario: string = '';
  rolUsuario: string = '';
  idUsuario: string = '';
  fotoPerfil: string = '';
  foto: any = '';
  constructor(
    public loginService: LoginService,
    private envioDatos: EnvioDatosEntreComponentesService,
    private usuariosService: UsuariosService
  ) {}

  async ngOnInit() {
    /*  setTimeout(() => {
      this.nombreUsuario=await this.obtenerDatosLogin();
    }, 3000); */
    try {
      this.nombreUsuario = await this.loginService.obtenerCampoJWT(
        'nombreUsuarioLogeado'
      );
      this.rolUsuario = await this.loginService.obtenerCampoJWT('role');
      this.sendMessage(this.rolUsuario);

      this.idUsuario = await this.loginService.obtenerCampoJWT('Id');
      this.sendMessage(this.idUsuario);
      this.fotoPerfil = await this.loginService.obtenerCampoJWT('rutaFoto');
      /* this.foto = await this.usuariosService.getImage(this.rutaFoto); */
     /*  setTimeout(() => {
        this.usuariosService
          .getImage1(
            this.rutaFoto
          )
          .subscribe((image) => {
            console.log('Foto');
            console.log('Foto');
            console.log('Foto');
            console.log('Foto');
            console.log('Foto');
            console.log(image);
            console.log('Foto');
            console.log('Foto');
            console.log('Foto');
            console.log('Foto');
            console.log('Foto');
            this.foto = URL.createObjectURL(image);
          });
      }, 3000); */

      /*       this.imageService.getImage('https://localhost:7207/personas/562f347e-5668-429d-ba53-b468209c7a3d.jpg')
      .subscribe(image => {
        this.image = URL.createObjectURL(image);
      }); */
    } catch (error) {
      console.log('Error el login');
    }
  }
  sendMessage(datoEnviar: any) {
    this.envioDatos.changeMessage(datoEnviar);
  }
}
