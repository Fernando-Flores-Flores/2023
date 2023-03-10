export interface VentasDTO {
  fechaOrden:        Date;
  tipoTrabajo:       string;
  descripcion:       string;
  costo:             number;
  fechaEntregaAprox: Date;
  observaciones:     string;
  tipoPago:          string;
  idPersonalAsignado:string;
  cliente:           Cliente;
}

export interface Cliente {
  ci_persona:         string;
  a_paterno:          string;
  a_materno:          string;
  celular:            string;
  nombre:             string;
  direccion:          string;
  correo_electronico: string;
}
