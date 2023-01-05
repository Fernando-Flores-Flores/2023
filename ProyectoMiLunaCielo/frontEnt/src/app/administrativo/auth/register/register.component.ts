import { Component, OnInit } from '@angular/core';
import { credencialesUsuario, parsearErroresAPI } from '../../../Model/auth';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
errores:string[];
  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
  }
  registrar(credencialesUsuario:credencialesUsuario){
this.loginService.registrar(credencialesUsuario).subscribe((resp:any)=>{
  console.log(resp);
},(errores:any)=>{
  console.log("Errores");

  console.log(errores);

  this.errores=parsearErroresAPI(errores);
})
  }

}
