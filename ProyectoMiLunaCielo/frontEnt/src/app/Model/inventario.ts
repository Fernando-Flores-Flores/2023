export interface Response {
  statusCode:       number;
  idConsulta:       number;
  codigoRespuesta:  number;
  mensajeRespuesta: string;
  fechaConsulta:    Date;
  datos:            InventarioDto[];
  claims:           null;
  base64:           null;
}

export interface InventarioDto {
  idtipoInventario:  string;
  codigo:            string;
  cantidad:          number;
  oficina:           string;
  descripcion:       string;
  observaciones:     string;
  area:              string;
  fechaCreacion:     Date;
  fechaModificacion: Date;
  estado:            string;
}
