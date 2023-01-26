using AutoMapper;
using BackEnd2023.dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BackEnd2023.Entidades;
using Microsoft.EntityFrameworkCore;

namespace BackEnd2023.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class personaController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly ILogger<VentasController> logger;
        private readonly IMapper mapper;

        public personaController(ApplicationDbContext context, ILogger<VentasController> logger, IMapper mapper)
        {
            this.context = context;
            this.logger = logger;
            this.mapper = mapper;
        }

        [HttpGet("listaOrdenes")]
        public async Task<ActionResult<List<PersonaOutDto>>> GetPersonas(int idPersona = 0)
        {
            try
            {
                var ci = idPersona.ToString();
                List<persona> personasFiltradas;
                if (idPersona > 0)
                {
                    personasFiltradas = await context.bd_Persona.Where(x => x.ci_persona == ci).ToListAsync();
                }
                else
                {
                    personasFiltradas = await context.bd_Persona.ToListAsync();
                }

                var response = new ResponseDto<List<persona>>()
                {
                    statusCode = StatusCodes.Status200OK,
                    fechaConsulta = DateTime.Now,
                    codigoRespuesta = 1001,
                    MensajeRespuesta = "CORRECTO",
                    datos = personasFiltradas
                };
                return Ok(response);
            }
            catch (Exception e)
            {
                logger.LogError(e, e.Message);
                return NotFound(e.Message);
            }
        }

        [HttpPost("CrearPersona")]
        public async Task<ActionResult<ResponseDto<long>>> PostUsuario([FromBody] persona request)
        {
            try
            {
                var cliente = new persona()
                {
                    ci_persona = request.ci_persona.Trim(),
                    a_paterno = request.a_paterno.Trim().ToUpper(),
                    a_materno = request.a_materno.Trim().ToUpper(),
                    nombre = request.nombre.Trim().ToUpper(),
                    celular = request.celular,
                    direccion = request.direccion.Trim().ToUpper(),
                    correo_electronico = request.correo_electronico.Trim(),
                };
                await context.AddAsync(cliente);
                await context.SaveChangesAsync();

                var response = new ResponseDto<persona>()
                {
                    statusCode = StatusCodes.Status200OK,
                    fechaConsulta = DateTime.Now,
                    codigoRespuesta = 1001,
                    MensajeRespuesta = "CORRECTO",
                    datos = cliente
                };

                return Ok(response);
            }
            catch (Exception e)
            {
                logger.LogError(e, e.Message);
                return NotFound(e.Message);
            }
        }

        [HttpPut("ActualizarPersona")]
        public async Task<ActionResult<ResponseDto<long>>> PutUsuario([FromBody] persona request, int id)
        {
            if (request.Id != id)
            {
                return BadRequest("El Id del autor  no coincide con el id de la URL");
            }
            try
            {
                var existe = await context.bd_Persona.AnyAsync(x => x.Id == id);
                if (!existe)
                {
                    return NotFound();
                }
                var cliente = new persona()
                {
                    Id = request.Id,
                    idUsuario = request.idUsuario,
                    ci_persona = request.ci_persona.Trim(),
                    a_paterno = request.a_paterno.Trim().ToUpper(),
                    a_materno = request.a_materno.Trim().ToUpper(),
                    nombre = request.nombre.Trim().ToUpper(),
                    celular = request.celular,
                    direccion = request.direccion.Trim().ToUpper(),
                    correo_electronico = request.correo_electronico.Trim(),
                };
                context.Update(cliente);
                await context.SaveChangesAsync();

                var response = new ResponseDto<persona>()
                {
                    statusCode = StatusCodes.Status200OK,
                    fechaConsulta = DateTime.Now,
                    codigoRespuesta = 1001,
                    MensajeRespuesta = "CORRECTO",
                    datos = cliente
                };

                return Ok(response);
            }
            catch (Exception e)
            {
                logger.LogError(e, e.Message);
                return NotFound(e.Message);
            }
        }


    }
}
