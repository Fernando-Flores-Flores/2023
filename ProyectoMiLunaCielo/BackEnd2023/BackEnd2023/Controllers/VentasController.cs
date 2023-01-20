using BackEnd2023.dtos;
using BackEnd2023.Entidades;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackEnd2023.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VentasController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly ILogger logger;

        public VentasController(ApplicationDbContext context, ILogger<VentasController> logger)
        {
            this.context = context;
            this.logger = logger;
        }

        [HttpGet("listaVentas")]
        public async Task<ActionResult<List<Ventas>>>Get(){
            try
            {
                var listaVentas = await context.bd_Ventas.ToListAsync();
                var response = new ResponseDto<List<Ventas>>()
                {
                    statusCode = StatusCodes.Status200OK,
                    fechaConsulta = DateTime.Now,
                    codigoRespuesta = 1001,
                    MensajeRespuesta = "CORRECTO",
                    datos = listaVentas
                };
                return Ok(response);
            }
            catch (Exception e)
            {
                logger.LogError(e, e.Message);
                return NotFound(e.Message);
            }
          
        }

        //public async Task<ActionResult<List<dto_Inventario>>> Get(string tipoFormulario)
        //{
        //    //Logger.LogInformation("Estamos recibiendo los autores");
        //    //return await Context.Autores.Include(x=>x.libros).ToListAsync();
        //    var inventario = await context.bd_Inventario.Where(x => x.IdtipoInventario == tipoFormulario).ToListAsync();

          
        //}


    }
}
