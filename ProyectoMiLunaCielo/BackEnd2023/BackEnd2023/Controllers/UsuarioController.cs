using BackEnd2023.dtos;
using BackEnd2023.Entidades;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace BackEnd2023.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly ILogger<UsuarioController> logger;
        private readonly ApplicationDbContext context;

        public UsuarioController(ILogger<UsuarioController> logger, ApplicationDbContext context)
        {
            this.logger = logger;
            this.context = context;
        }

        [HttpPost("CrearUsuarioPost")]
        public async Task<ActionResult<ResponseDto<long>>> PostUsuario([FromBody] UsuarioInDto request)
        {
            try
            {
                long respIdUsuario = 0;
                var usuarioIn = new usuario()
                {
                    usuarioNombre = request.usuarioNombre,
                    password = request.password,
                    idRol = request.idRol,
                };
                respIdUsuario = await this.context.GuardarUsuario(usuarioIn);

                var personaIn = new persona()
                {
                    idUsuario = respIdUsuario,
                    ci_persona = request.Persona.ci_persona.Trim(),
                    a_paterno = request.Persona.a_paterno.Trim(),
                    a_materno = request.Persona.a_materno.Trim(),
                    celular = request.Persona.celular,
                    direccion = request.Persona.direccion.Trim(),
                    correo_electronico = request.Persona.correo_electronico.Trim(),
                };

                context.AddAsync(personaIn);
                await context.SaveChangesAsync();


                var response = new ResponseDto<long>()
                {
                    statusCode = StatusCodes.Status200OK,
                    fechaConsulta = DateTime.Now,
                    codigoRespuesta = 1001,
                    MensajeRespuesta = "CORRECTO",
                    datos = respIdUsuario
                };

                return Ok(response);

            }
            catch (Exception e)
            {
                logger.LogError(e, e.Message);
                return NotFound("Entro al catch");
            }
        }

     



    }
}
