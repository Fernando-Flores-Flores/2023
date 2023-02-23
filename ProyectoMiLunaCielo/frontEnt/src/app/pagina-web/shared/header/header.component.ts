import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/administrativo/service/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  email = '';
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.email = this.loginService.obtenerCampoJWT('email');
  }
  logout() {
    this.loginService.logout();
  }

  mostrarOffCanva = false;
  mostrar() {
    if (!this.mostrarOffCanva) {
      const offcanvas: any = document.querySelector('.offcanvas');
      const toggleButton: any = document.querySelector('#toggle-button');
      console.log('se abrio');
      offcanvas.style.left = '0';
      this.mostrarOffCanva = true;
    } else {
      const offcanvas: any = document.querySelector('.offcanvas');
      const closeButton: any = document.querySelector('#close-button');
      console.log('se cerro');
      offcanvas.style.left = '-400px';
      this.mostrarOffCanva = false;
    }
  }

  menuPerfil: Array<any> = [
    {
      nombre: 'FACEBOOK',
      icono: 'assets/dist/img/iconos/facebook.png',
      url: 'https://www.facebook.com/profile.php?id=100063532795559',
    },
    {
      nombre: 'WHATSAPP',
      icono: 'assets/dist/img/iconos/whatsapp.png',
      url: 'https://api.whatsapp.com/send?phone=59165610080&text=MENSAJE',
    },
    {
      nombre: 'TIK TOKS',
      icono: 'assets/dist/img/iconos/tiktok.png',
      url: 'chancePassword',
    },
/*     {
      nombre: 'LOGIN',
      icono: 'assets/dist/img/iconos/inicioSesion.png',
      url: 'login',
    }, */
    /*
    {
      nombre: 'GENERAR O SOLICITAR PIN',
      icono: 'fa fa-shield fa-2x',
      url: 'generatePin',
    },
    {
      nombre: 'ACTUALIZACIÓN DE INFORMACIÓN',
      icono: 'fa fa-marker fa-2x',
      url: 'updateInfo',
    }, */
  ];


}
