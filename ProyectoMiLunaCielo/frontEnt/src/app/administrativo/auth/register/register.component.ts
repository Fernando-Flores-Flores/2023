import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { credencialesUsuario, parsearErroresAPI } from '../../../Model/auth';
import { LoginService } from '../../service/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  errores: string[];
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {}
  registrar(credencialesUsuario: credencialesUsuario) {
    this.loginService.registrar(credencialesUsuario).subscribe(
      (resp: any) => {
        console.log(resp);
        this.loginService.guardarToken(resp);
        Swal.fire({});

        Swal.fire({
          icon: 'success',
          title: 'Registro realizado correctamente',
          text: 'Puedes iniciar sesión con las credenciales ingresadas',

          confirmButtonText: 'Entiendo',
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/login']);
          }
        });
      },
      (errores: any) => {
        console.log('Errores');
        console.log(errores);
        this.errores = parsearErroresAPI(errores);
      }
    );
  }
}
