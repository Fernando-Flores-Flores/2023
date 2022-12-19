import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-listado-mistrabajos',
  templateUrl: './listado-mistrabajos.component.html',
  styleUrls: ['./listado-mistrabajos.component.scss']
})
export class ListadoMistrabajosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.test();
  }
  test() {
    $("#showInconsistencia").modal("show");
  }
}
