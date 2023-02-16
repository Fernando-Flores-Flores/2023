import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MostrarErroresComponent } from './mostrar-errores/mostrar-errores.component';
import { InputImgComponent } from './input-img/input-img.component';



@NgModule({
  declarations: [MostrarErroresComponent, InputImgComponent],
  imports: [
    CommonModule
  ],
  exports:[
    MostrarErroresComponent,InputImgComponent
  ],
})
export class UtilitariosModule { }
