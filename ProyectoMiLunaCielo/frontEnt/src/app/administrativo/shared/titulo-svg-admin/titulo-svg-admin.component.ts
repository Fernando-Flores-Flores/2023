import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-titulo-svg-admin',
  templateUrl: './titulo-svg-admin.component.html',
  styleUrls: ['./titulo-svg-admin.component.scss'],
})
export class TituloSvgAdminComponent implements OnInit {
  @Input() tituloPagina = '';
  logeado: boolean = false;
  constructor() {}

  ngOnInit(): void {}
}
