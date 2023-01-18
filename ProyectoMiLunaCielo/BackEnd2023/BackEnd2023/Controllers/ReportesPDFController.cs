using AutoMapper;
using BackEnd2023.dtos;
using BackEnd2023.dtos.dto_Inventarios;
using BackEnd2023.Metodos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd2023.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportesPDFController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public ReportesPDFController(ApplicationDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }



        [HttpGet("generarPDF")]
        public async Task<ActionResult<List<dto_Inventario>>> Get(string tipoFormulario)
        {
            //var inventario = await context.bd_Inventario.Where(x => x.IdtipoInventario == tipoFormulario).ToListAsync();
            Reportes reportes = new Reportes();
            string tipoForm = tipoFormulario;
            pdf pdf = new pdf();
           string titulo= pdf.verificarTitulo(tipoForm);
            string resultado = reportes.generarReportePDF(tipoFormulario, titulo);
            var response = new ResponseDto<string>()
            {
                statusCode = StatusCodes.Status200OK,
                fechaConsulta = DateTime.Now,
                codigoRespuesta = 1001,
                MensajeRespuesta = "CORRECTO",
                //datos = mapper.Map<List<dto_Inventario>>(inventario)
                datos = resultado
            };
            return Ok(response);
        }
    }
}
