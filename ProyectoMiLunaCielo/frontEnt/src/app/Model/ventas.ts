export interface VentasDTO {
    fechaOrden:         Date;
    tipoTrabajo:        string;
    descripcion:        string;
    costo:              number;
    fechaEntregaAprox:  Date;
    observaciones:      string;
    tipoPago:           string;
    idPersonalAsignado: string;
    cliente:            Cliente;
}

export interface Cliente {
    nombre:  string;
    nit:     string;
    celular: number;
}
