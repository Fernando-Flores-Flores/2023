import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  credencialesUsuario,
  parsearErroresAPI,
  PersonaInDto,
} from 'src/app/Model/auth';
import Swal from 'sweetalert2';
import { LoginService } from '../../service/login.service';
import { UsuariosService } from '../../service/usuarios.service';

@Component({
  selector: 'app-registro-usuarios',
  templateUrl: './registro-usuarios.component.html',
  styleUrls: ['./registro-usuarios.component.scss'],
})
export class RegistroUsuariosComponent implements OnInit {
  errores: string[];
  form: FormGroup;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private usuariosService: UsuariosService,
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
  }

  ngOnInit(): void {}
  private buildForm() {
    this.form = this.formBuilder.group({
      ci_persona: ['', [Validators.required]],
      a_paterno: ['', [Validators.required]],
      a_materno: ['', [Validators.required]],
      celular: [
        '',
        [
          Validators.pattern(/^[1-9]\d{6,10}$/),
          Validators.max(99999999),
          Validators.required,
        ],
      ],
      nombre: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      correo_electronico: ['', [Validators.required, Validators.email]],
      foto: ['', [Validators.required]],
    });
  }

  async registrarCuenta() {
    let personaInDto: PersonaInDto;

    try {
      if (this.form.valid) {
        personaInDto = this.form.value as PersonaInDto;
        let response: any = await this.usuariosService.CrearCuentaUsuario(
          personaInDto
        );
        if (response.statusCode == 200) {
          Swal.fire({
            icon: 'success',
            title: 'Registro realizado correctamente',
            text: 'Puedes iniciar sesión con las credenciales ingresadas',

            confirmButtonText: 'Entiendo',
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/admin/listadoUsuarios']);
            }
          });
        }
      } else {
        this.form.markAllAsTouched();
        console.error('Complete el formulario');
      }
    } catch (error) {
      console.log('Errores');
      console.log(error);
      this.errores = parsearErroresAPI(error);
    }
  }

  imagenCambiada = false;

  archivoSeleccionado(file:any){
    this.imagenCambiada = true;
    this.form.get('foto')?.setValue(file);
  }


}
