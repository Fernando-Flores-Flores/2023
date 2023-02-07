import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roles',
})
export class RolesPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    switch (value) {
      case 'prod':
        return 'PRODUCCIÓN';
      case 'ventas':
        return 'VENTAS';
      case 'admin':
        return 'ADMINISTRADOR';
      case 'user':
        return 'USUARIO';
       }
    return 'SIN ROL';
  }
}
