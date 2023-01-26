import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MetodosService {

  constructor() { }
  public fechaActual(): string {
    let f = new Date();
    let day = f.getDate().toString();
    if (parseInt(day) <= 9) {
      day = "0" + day;
    }
    let month = (f.getMonth() + 1).toString();
    if (parseInt(month) <= 9) {
      month = "0" + month;
    }
    let fe: string = f.getFullYear() + "-" + month + "-" + day;
    return fe;
  }
}
