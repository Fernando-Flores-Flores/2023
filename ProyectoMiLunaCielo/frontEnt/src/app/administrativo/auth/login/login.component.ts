import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';
import { credencialesUsuario, parsearErroresAPI } from '../../../Model/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  errores: string[] = [];
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {}

  login(credenciales: credencialesUsuario) {
    this.loginService.login(credenciales).subscribe(
      (resp: any) => {
        this.loginService.guardarToken(resp);
        console.log("Se logeo con exito");

        //this.router.navigate(['/admin/home']);
        window.location.href= '/admin/home';
      },
      (errores: any) => {
        console.log('Errores');
        console.log(errores);
        this.errores = parsearErroresAPI(errores);
      }
    );
  }

  mostrarContrasena() {
    var tipo: any = document.getElementById('password');
    if (tipo.type == 'password') {
      tipo.type = 'text';
    } else {
      tipo.type = 'password';
    }
  }
}
