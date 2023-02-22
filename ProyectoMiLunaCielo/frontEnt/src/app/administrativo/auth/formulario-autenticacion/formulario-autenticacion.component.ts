import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { credencialesUsuario } from 'src/app/Model/auth';

@Component({
  selector: 'app-formulario-autenticacion',
  templateUrl: './formulario-autenticacion.component.html',
  styleUrls: ['./formulario-autenticacion.component.scss'],
})
export class FormularioAutenticacionComponent implements OnInit {
  form: FormGroup;
  @Input() errores: string[] = [];
  @Output() onSubmit: EventEmitter<credencialesUsuario> =
    new EventEmitter<credencialesUsuario>();
  @Input() accion:string;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      //email: ['admin@gmail.com', { validators: [Validators.required, Validators.email] }],
      email: ['produccion1@gmail.com', { validators: [Validators.required, Validators.email] }],
      //email: ['gerencia@gmail.com, { validators: [Validators.required, Validators.email] }],
        //email: ['ventas@gmail.com', { validators: [Validators.required, Validators.email] }],
      //email: ['produccion2@gmail.com', { validators: [Validators.required, Validators.email] }],
      password: ['Tempo.2023@', { validators: [Validators.required] }],
    });
  }

  obtenerMensajeErrorEmail(): string {
    let response = '';
    var campo = this.form.get('email');
    if (campo?.hasError('required')) {
      response = 'El campo email es requerido';
    }
    if (campo?.hasError('email')) {
      response = 'El campo email es no es válido';
    }
    return response;
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
