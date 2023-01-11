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
  logout(){
    this.loginService.logout();
  }
}
