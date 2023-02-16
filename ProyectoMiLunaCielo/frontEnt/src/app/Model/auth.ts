export interface credencialesUsuario {
  email: string;
  password: string;
}

export interface respuestaAutenticacion {
  token: string;
  expiracion: string;
}
export function parsearErroresAPI(response: any): string[] {
  const resultado: string[] = [];

  console.log(response.status);

  if (response.status === 500) {
    resultado.push(
      'Ha ocurrido un error en el servidor. Favor intentar más tarde'
    );
    return resultado;
  }

  if (response.error) {
    if (typeof response.error === 'string') {
      resultado.push(response.error);
    } else if (Array.isArray(response.error)) {
      response.error.forEach((valor: any) => {
        resultado.push(valor.description);
      });
    } else {
      const mapaErrores = response.error.errors;
      const entradas = Object.entries(mapaErrores);
      entradas.forEach((arreglo: any[]) => {
        const campo = arreglo[0];
        arreglo[1].forEach((mensajeError: any) => {
          resultado.push(`${campo}: ${mensajeError}`);
        });
      });
    }
  }

  return resultado;
}
export interface usuarioDTO {
  id: string;
  email: string;
  claims: any[];
}
export interface PersonaInDto {
  ci_persona: string;
  a_paterno: string;
  a_materno: string;
  celular: string;
  nombre: string;
  direccion: string;
  correo_electronico: string;
  foto?: File;
}
