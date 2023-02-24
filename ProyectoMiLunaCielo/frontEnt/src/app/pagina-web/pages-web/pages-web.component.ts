import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { LoginService } from 'src/app/administrativo/service/login.service';

@Component({
  selector: 'app-pages-web',
  templateUrl: './pages-web.component.html',
  styleUrls: ['./pages-web.component.scss'],
})
export class PagesWebComponent implements OnInit {
  constructor(private loginService: LoginService, private router: Router) {}
  mostrarBanner: boolean = true;

  ngOnInit() {
    //alert("Esta logeado : "+ !this.loginService.estalogeado());
    if (this.loginService.estalogeado()) {
      this.router.navigate(['/admin/home']);
    }
  }
}
