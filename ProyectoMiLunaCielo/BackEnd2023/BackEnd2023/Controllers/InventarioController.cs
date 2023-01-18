using AutoMapper;
using BackEnd2023.dtos;
using BackEnd2023.dtos.dto_Inventarios;
using BackEnd2023.Entidades.bd.Inventarios;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackEnd2023.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventarioController : ControllerBase
    {
        private readonly ILogger<UsuarioController> logger;
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public InventarioController(ILogger<UsuarioController> logger, ApplicationDbContext context, IMapper mapper)
        {
            this.logger = logger;
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet("listarInventario")]
        public async Task<ActionResult<List<dto_Inventario>>> Get(string tipoFormulario)
        {
            //Logger.LogInformation("Estamos recibiendo los autores");
            //return await Context.Autores.Include(x=>x.libros).ToListAsync();
            var inventario = await context.bd_Inventario.Where(x => x.IdtipoInventario == tipoFormulario).ToListAsync();
          
            var response = new ResponseDto<List<dto_Inventario>>()
            {
                statusCode = StatusCodes.Status200OK,
                fechaConsulta = DateTime.Now,
                codigoRespuesta = 1001,
                MensajeRespuesta = "CORRECTO",
                datos = mapper.Map<List<dto_Inventario>>(inventario)
            };
            return Ok(response);
        }

        [HttpPost("CrearInventario")]
        public async Task<ActionResult<ResponseDto<long>>> PostUsuario([FromBody] dto_Inventario request)
        {
            try
            {
                DateTime FechaCreacion = DateTime.Now;
                //FechaCreacion = DateTime.SpecifyKind(FechaCreacion, DateTimeKind.Utc);
                FechaCreacion = FechaCreacion.ToUniversalTime();
                DateTime FechaModificacion = DateTime.Now;
                FechaModificacion = FechaModificacion.ToUniversalTime();

                var c = 0;
                string codigoGenerado = "mue-" + DateTime.Now.ToString("yyyyMMdd") + c;
                while (await ExisteCodigoEnBD(codigoGenerado) == true)
                {
                    codigoGenerado = "mue-" + DateTime.Now.ToString("yyyyMMdd") + c;
                    c++;
                }
                var registroInventario = new inventario()
                {
                    IdtipoInventario = request.IdtipoInventario.Trim(),
                    codigo = codigoGenerado,
                    cantidad = request.cantidad,
                    oficina = request.oficina,
                    descripcion = request.descripcion.Trim(),
                    observaciones = request.observaciones,
                    area = request.area,
                    fechaCreacion = FechaCreacion,
                    fechaModificacion = FechaModificacion,
                    estado = request.estado,
                };
                await context.AddAsync(registroInventario);
                await context.SaveChangesAsync();

                var response = new ResponseDto<inventario>()
                {
                    statusCode = StatusCodes.Status200OK,
                    fechaConsulta = DateTime.Now,
                    codigoRespuesta = 1001,
                    MensajeRespuesta = "CORRECTO",
                    datos = registroInventario
                };
                return Ok(response);
            }
            catch (Exception e)
            {
                logger.LogError(e, e.Message);
                return NotFound(e.Message);
            }
        }

        [HttpDelete("BorrarRegistroInventario")]
        public async Task<ActionResult> EliminarInventario(string codigo)
        {
            var existe = await context.bd_Inventario.AnyAsync(x => x.codigo == codigo);

            if (!existe)
            {
                return NotFound("No se encontro el usuario con código " + codigo);
            }
            var inventario = await context.bd_Inventario.FirstOrDefaultAsync(x => x.codigo == codigo);
            context.Remove(inventario);
            await context.SaveChangesAsync();
            var response = new ResponseDto<inventario>()
            {
                statusCode = StatusCodes.Status200OK,
                fechaConsulta = DateTime.Now,
                codigoRespuesta = 1001,
                MensajeRespuesta = "CORRECTO",

            };
            return Ok(response);
        }



        [HttpGet]
        public async Task<bool> ExisteCodigoEnBD(string codigo)
        {
            var res = await context.bd_Inventario.AnyAsync(p => p.codigo == codigo);
            if (res)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
