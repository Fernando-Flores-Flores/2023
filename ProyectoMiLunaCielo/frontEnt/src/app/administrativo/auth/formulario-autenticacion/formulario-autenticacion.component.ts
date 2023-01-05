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
      email: ['', { validators: [Validators.required, Validators.email] }],
      password: ['', { validators: [Validators.required] }],
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
}
