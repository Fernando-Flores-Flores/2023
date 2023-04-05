import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  rolUsuario: string = '';
  titulo: string = 'PANEL DE CONTROL';
  constructor(public loginService: LoginService) {}

  async ngOnInit() {
    this.rolUsuario = await this.loginService.obtenerCampoJWT('role');
  }
}
