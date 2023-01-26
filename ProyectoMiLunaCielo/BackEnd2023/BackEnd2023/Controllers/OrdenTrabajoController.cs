using AutoMapper;
using BackEnd2023.dtos;
using BackEnd2023.Entidades;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackEnd2023.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdenTrabajoController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly ILogger<VentasController> logger;
        private readonly IMapper mapper;

        public OrdenTrabajoController(ApplicationDbContext context, ILogger<VentasController> logger, IMapper mapper)
        {
            this.context = context;
            this.logger = logger;
            this.mapper = mapper;
        }

        [HttpGet("listaOrdenes")]
        public async Task<ActionResult<List<ordenTrabajo>>> GetOrdenes(int idCliente = 0)
        {
            try
            {

                if (idCliente > 0)
                {
                    var ordenesFiltradas = await context.bd_ordentrabajo.FindAsync(idCliente);
                    var lista = new List<ordenTrabajo>();
                    lista.Add(ordenesFiltradas);
                    //var personasRelacionadas = ordenesFiltradas.Select(o => o.IdCliente);
                    //var listaOrdenes = await personasRelacionadas.ToListAsync();
                    var response = new ResponseDto<List<ordenTrabajo>>()
                    {
                        statusCode = StatusCodes.Status200OK,
                        fechaConsulta = DateTime.Now,
                        codigoRespuesta = 1001,
                        MensajeRespuesta = "CORRECTO",
                        datos = lista
                    };
                    return Ok(response);
                }
                else
                {
                    var listaOrdenes = await context.bd_ordentrabajo.ToListAsync();
                    var response = new ResponseDto<List<ordenTrabajo>>()
                    {
                        statusCode = StatusCodes.Status200OK,
                        fechaConsulta = DateTime.Now,
                        codigoRespuesta = 1001,
                        MensajeRespuesta = "CORRECTO",
                        datos = listaOrdenes
                    };
                    return Ok(response);

                }
            }
            catch (Exception e)
            {
                logger.LogError(e, e.Message);
                return NotFound(e.Message);
            }
        }

        [HttpPost("CrearOrdenTrabajo")]
        public async Task<ActionResult<ResponseDto<long>>> PostUsuario([FromBody] OrdenTrabajoDTO request)
        {
            try
            {
                var cliente = new persona()
                {
                    ci_persona = request.Cliente.ci_persona.Trim(),
                    a_paterno = request.Cliente.a_paterno.Trim().ToUpper(),
                    a_materno = request.Cliente.a_materno.Trim().ToUpper(),
                    nombre = request.Cliente.nombre.Trim().ToUpper(),
                    celular = request.Cliente.celular,
                    direccion = request.Cliente.direccion.Trim().ToUpper(),
                    correo_electronico = request.Cliente.correo_electronico.Trim(),
                };
                await context.AddAsync(cliente);
                await context.SaveChangesAsync();

                var idAsignado = context.bd_Persona.Where(c => c.ci_persona == cliente.ci_persona).Select(c => c.Id).FirstOrDefault();

                DateTime FechaCreacion = DateTime.Now.ToUniversalTime();
                DateTime FechaModificacion = DateTime.Now.ToUniversalTime();
                DateTime FechaO = (DateTime)request.FechaOrden;
                DateTime FechaOrden = FechaO.ToUniversalTime();
                DateTime FechaE = (DateTime)request.FechaEntregaAprox;
                DateTime FechaEntrega = FechaO.ToUniversalTime();

                var ordenTrabajo = new ordenTrabajo()
                {
                    FechaOrden = FechaOrden,
                    TipoTrabajo = request.TipoTrabajo.ToUpper(),
                    Descripcion = request.Descripcion.ToUpper(),
                    costo = request.costo,
                    FechaEntregaAprox = FechaEntrega,
                    Observaciones = request.Observaciones.ToUpper(),
                    TipoPago = request.TipoPago.ToUpper(),
                    IdCliente = idAsignado,
                    fechaCreacion = FechaCreacion,
                    fechaModificacion = FechaModificacion,

                };
                await context.AddAsync(ordenTrabajo);
                await context.SaveChangesAsync();

                var response = new ResponseDto<ordenTrabajo>()
                {
                    statusCode = StatusCodes.Status200OK,
                    fechaConsulta = DateTime.Now,
                    codigoRespuesta = 1001,
                    MensajeRespuesta = "CORRECTO",
                    datos = ordenTrabajo
                };

                return Ok(response);

            }
            catch (Exception e)
            {
                logger.LogError(e, e.Message);
                return NotFound(e.Message);
            }
        }

        [HttpPut("{idOrden:int}")]
        public async Task<ActionResult> Put(ordenTrabajo request, int idOrden)
        {
            if (request.IdOrdenTrabajo != idOrden)
            {
                return BadRequest("El Id del autor  no coincide con el id de la URL");
            }

            try
            {
                var existe = await context.bd_ordentrabajo.AnyAsync(x => x.IdOrdenTrabajo == idOrden);
                if (!existe)
                {
                    return NotFound();
                }
                DateTime FechaCreacion = DateTime.Now.ToUniversalTime();
                DateTime FechaModificacion = DateTime.Now.ToUniversalTime();
                DateTime FechaO = (DateTime)request.FechaOrden;
                DateTime FechaOrden = FechaO.ToUniversalTime();
                DateTime FechaE = (DateTime)request.FechaEntregaAprox;
                DateTime FechaEntrega = FechaO.ToUniversalTime();
                var ordenTrabajo = new ordenTrabajo()
                {
                    IdOrdenTrabajo = request.IdOrdenTrabajo,
                    FechaOrden = FechaOrden,
                    TipoTrabajo = request.TipoTrabajo.ToUpper(),
                    Descripcion = request.Descripcion.ToUpper(),
                    costo = request.costo,
                    FechaEntregaAprox = FechaEntrega,
                    Observaciones = request.Observaciones.ToUpper(),
                    TipoPago = request.TipoPago.ToUpper(),
                    IdCliente = request.IdCliente,
                    fechaCreacion = FechaCreacion,
                    fechaModificacion = FechaModificacion,
                };

                context.Update(ordenTrabajo);
                await context.SaveChangesAsync();

                var lista = new List<ordenTrabajo>();
                lista.Add(ordenTrabajo);
                var response = new ResponseDto<List<ordenTrabajo>>()
                {
                    statusCode = StatusCodes.Status200OK,
                    fechaConsulta = DateTime.Now,
                    codigoRespuesta = 1001,
                    MensajeRespuesta = "CORRECTO",
                    datos = lista
                };
                return Ok(response);
            }
            catch (Exception e)
            {
                logger.LogError(e, e.Message);
                return NotFound(e.Message);
            }
        }

        [HttpDelete("BorrarRegistroOrdenTrabajo")]
        public async Task<ActionResult> EliminarOrdenTrabajo(int IdOrdenTrabajo)
        {
            var existe = await context.bd_ordentrabajo.AnyAsync(x => x.IdOrdenTrabajo == IdOrdenTrabajo);
            if (!existe)
            {
                return NotFound("No se encontro el usuario con código " + IdOrdenTrabajo);
            }
            var orden = await context.bd_ordentrabajo.FirstOrDefaultAsync(x => x.IdOrdenTrabajo == IdOrdenTrabajo);
            context.Remove(orden);
            await context.SaveChangesAsync();
            var response = new ResponseDto<long>()
            {
                statusCode = StatusCodes.Status200OK,
                fechaConsulta = DateTime.Now,
                codigoRespuesta = 1001,
                MensajeRespuesta = "CORRECTO",

            };
            return Ok(response);
        }

    }
}
