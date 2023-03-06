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
        public async Task<ActionResult<List<bd_Notificacion>>> GetNotificaciones(string idUsuario,bool leido=false)
        {
            try
            {
                var listaNotificaciones = new List<bd_Notificacion>();
                var listaNotificacionesFIN = new List<dto_Notificaciones_OUT>();
                if (idUsuario == "all")
                {
                    var listaNotificacionesBD = await context.bd_Notificacion.ToListAsync();
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
                        var nombre = personasFiltradas[0].nombre +" "+ personasFiltradas[0].a_paterno + " " + personasFiltradas[0].a_materno;
                        var notificaion = new dto_Notificaciones_OUT();
                        notificaion.fechaCreacion = listaNotificacion.fechaCreacion;
                        notificaion.fechaleido = listaNotificacion.fechaleido;
                        notificaion.leido = listaNotificacion.leido;
                        notificaion.mensaje = listaNotificacion.mensaje;
                        notificaion.idUsuarioEnvia = listaNotificacion.idUsuarioEnvia;
                        notificaion.idUsuarioRecibe = listaNotificacion.idUsuarioRecibe;

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
        public async Task<ActionResult<ResponseDto<string>>> EnviarNotificacion(string mensaje, string idUsuarioEnvia, string idUsuarioRecibe)
        {
            try
            {
                DateTime FechaCreacion = DateTime.Now.ToUniversalTime();
                DateTime FechaModificacion = DateTime.Now.ToUniversalTime();

                var notificacion = new bd_Notificacion()
                {
                    fechaCreacion = FechaCreacion,
                    fechaModificacion = FechaModificacion,
                    idUsuarioEnvia = idUsuarioEnvia,
                    idUsuarioRecibe = idUsuarioRecibe,
                    mensaje = mensaje,
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
    }
}
