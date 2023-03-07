import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-cuerpo',
  templateUrl: './cuerpo.component.html',
  styleUrls: ['./../../pages-web/pages-web.component.scss'],
})
export class CuerpoComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    AOS.init()
    window.addEventListener('load',AOS.refresh);
  }

  listaCuerpo: Array<any> = [
    {
      titulo: 'Tarjetas de presentacion',
      descripcion:
        'Crea tu red de clientes, mostrando tus tarjetas de presentación. Conoce nuestra variedad de acabados e imprime desde 100 piezas.',
      posicion: 1,
      url: 'assets/dist/img/boorarDespues/uno.png',
    },
    {
      titulo: 'Volantes',
      descripcion:
        'Comunica en tus volantes los mensajes claves de tu negocio: características de tus productos, precios y ofertas. Imprime desde 25 piezas hasta miles.',
      posicion: 2,
      url: 'assets/dist/img/boorarDespues/2.png',
    },
    {
      titulo: 'Etiquetas de productos',
      descripcion:
        'Las etiquetas de tus productos son parte de tu marca, describen tu producto en segundos. Imprime desde 100 piezas. En etiquetas somos los mejores!',
      posicion: 3,
      url: 'assets/dist/img/boorarDespues/3.png',
    },
    {
      titulo: 'Estampado y Bordado',
      descripcion:
        'Dale a tu equipo prendas cómodas y funcionales, que ayuden a construir la imagen de tu empresa.',
      posicion: 4,
      url: 'assets/dist/img/boorarDespues/4.png',
    },
  ];
}
