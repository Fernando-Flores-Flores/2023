using BackEnd2023.dtos;
using BackEnd2023.Entidades;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackEnd2023.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificacionesController : ControllerBase
    {
        private readonly ApplicationDbContext context;

        public NotificacionesController(ApplicationDbContext context)
        {
            this.context = context;
        }
        [HttpGet("listaNotificaciones")]
        public async Task<ActionResult<List<bd_Notificacion>>> GetNotificaciones(string idUsuario, bool leido)
        {
            try
            {
                var listaNotificaciones = new List<bd_Notificacion>();
                var listaNotificacionesFIN = new List<dto_Notificaciones_OUT>();
                if (leido == null)
                {
                    var listaNotificacionesBD = await context.bd_Notificacion
                              .Where(x => x.idUsuarioRecibe == idUsuario)
                              .ToListAsync();
                    listaNotificaciones.AddRange(listaNotificacionesBD);
                }
                else
                {
                    var listaNotificacionesBD = await context.bd_Notificacion
                                .Where(x => x.idUsuarioRecibe == idUsuario && x.leido == leido)
                                .ToListAsync();
                    listaNotificaciones.AddRange(listaNotificacionesBD);
                }
                if (listaNotificaciones.Count > 0)
                {
                    foreach (var listaNotificacion in listaNotificaciones)
                    {
                        var userId = listaNotificacion.idUsuarioEnvia;
                        var personasFiltradas = await context.bd_Persona.Where(x => x.idUsuario == userId).ToListAsync();
                        var rutaFoto = personasFiltradas[0].foto;
                        var nombre = personasFiltradas[0].nombre + " " + personasFiltradas[0].a_paterno + " " + personasFiltradas[0].a_materno;
                        var notificaion = new dto_Notificaciones_OUT();
                        notificaion.fechaCreacion = listaNotificacion.fechaCreacion;
                        notificaion.fechaleido = listaNotificacion.fechaleido;
                        notificaion.leido = listaNotificacion.leido;
                        notificaion.mensaje = listaNotificacion.mensaje;
                        notificaion.idUsuarioEnvia = listaNotificacion.idUsuarioEnvia;
                        notificaion.idUsuarioRecibe = listaNotificacion.idUsuarioRecibe;
                        notificaion.id = listaNotificacion.id;

                        if (rutaFoto != null)
                        {
                            System.Net.WebClient webClient = new System.Net.WebClient();
                            byte[] imageBytes = webClient.DownloadData(rutaFoto);
                            string base64String = System.Convert.ToBase64String(imageBytes);
                            string imageSrc = "data:image/jpeg;base64," + base64String;
                            notificaion.foto = imageSrc;
                            notificaion.nombre = nombre;
                        }
                        listaNotificacionesFIN.Add(notificaion);
                    }
                }
                var response = new ResponseDto<List<dto_Notificaciones_OUT>>()
                {
                    statusCode = StatusCodes.Status200OK,
                    fechaConsulta = DateTime.Now,
                    codigoRespuesta = 1001,
                    MensajeRespuesta = "CORRECTO",
                    datos = listaNotificacionesFIN
                };
                return Ok(response);

            }
            catch (Exception e)
            {
                return NotFound(e.Message);
            }
        }


        [HttpPost("EnviarNotificacion")]
        public async Task<ActionResult<ResponseDto<string>>> EnviarNotificacion(dto_enviaNotificacion body)
        {
            try
            {
                DateTime FechaCreacion = DateTime.Now.ToUniversalTime();
                DateTime FechaModificacion = DateTime.Now.ToUniversalTime();

                var notificacion = new bd_Notificacion()
                {
                    fechaCreacion = FechaCreacion,
                    fechaModificacion = FechaModificacion,
                    idUsuarioEnvia = body.idUsuarioEnvia,
                    idUsuarioRecibe = body.idUsuarioRecibe,
                    mensaje = body.mensaje,
                    leido = false,
                    fechaleido = null
                };
                await context.AddAsync(notificacion);
                await context.SaveChangesAsync();

                var response = new ResponseDto<string>()
                {
                    statusCode = StatusCodes.Status200OK,
                    fechaConsulta = DateTime.Now,
                    codigoRespuesta = 1001,
                    MensajeRespuesta = "CORRECTO",
                    datos = "Enviado"
                };
                return Ok(response);
            }
            catch (Exception e)
            {
                return NotFound(e.Message);
            }
        }

        //[HttpPut("{idNotificacion:int}")]
        //public async Task<ActionResult> Put(bool leidoPUT, int idNotificacion)
        //{
        //    try
        //    {
        //        var notifica = await context.bd_Notificacion.FindAsync(idNotificacion);
        //        if (notifica == null)
        //        {
        //            return NotFound();
        //        }
        //        Console.Write(notifica);

        //        DateTime FechaModificacion = DateTime.Now.ToUniversalTime();

        //        var notificacion = new dto_Notificacion()
        //        {
        //            id= idNotificacion,
        //            idUsuarioEnvia = notifica.idUsuarioEnvia,
        //            idUsuarioRecibe = notifica.idUsuarioRecibe,
        //            mensaje = notifica.mensaje,
        //            leido = leidoPUT,
        //            fechaleido = FechaModificacion,
        //            fechaCreacion = FechaModificacion,
        //            fechaModificacion = FechaModificacion,
        //        };
        //        context.Update(notificacion);
        //        await context.SaveChangesAsync();

        //        var response = new ResponseDto<dto_Notificacion>()
        //        {
        //            statusCode = StatusCodes.Status200OK,
        //            fechaConsulta = DateTime.Now,
        //            codigoRespuesta = 1001,
        //            MensajeRespuesta = "CORRECTO",
        //            datos = notificacion
        //        };
        //        return Ok(response);
        //    }
        //    catch (Exception e)
        //    {
        //        return NotFound(e.Message);
        //    }
        //}

        [HttpPut("{idNotificacion:int}")]
        public async Task<ActionResult> Put(bool leidoPUT, int idNotificacion)
        {
            try
            {
                var notifica = await context.bd_Notificacion.FindAsync(idNotificacion);
                if (notifica == null)
                {
                    return NotFound();
                }

                DateTime FechaModificacion = DateTime.Now.ToUniversalTime();

                notifica.leido = leidoPUT;
                notifica.fechaleido = FechaModificacion;
                notifica.fechaModificacion = FechaModificacion;

                await context.SaveChangesAsync();

                var response = new ResponseDto<bool>()
                {
                    statusCode = StatusCodes.Status200OK,
                    fechaConsulta = DateTime.Now,
                    codigoRespuesta = 1001,
                    MensajeRespuesta = "CORRECTO",
                    datos = true
                };
                return Ok(response);
            }
            catch (Exception e)
            {
                return NotFound(e.Message);
            }
        }

    }
}
