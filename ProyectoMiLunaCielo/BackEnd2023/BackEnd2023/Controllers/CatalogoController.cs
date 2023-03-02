using AutoMapper;
using BackEnd2023.dtos.dto_Inventarios;
using BackEnd2023.dtos;
using BackEnd2023.Entidades.bd.Inventarios;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using BackEnd2023.Entidades;
using Microsoft.AspNetCore.Identity;
using Org.BouncyCastle.Asn1.Ocsp;
using BackEnd2023.Utilitarios;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BackEnd2023.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CatalogoController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IAlmacenadorArchivos almacenadorArchivos;
        private readonly string contenedor = "catalogo";

        public CatalogoController(ApplicationDbContext context, IAlmacenadorArchivos almacenadorArchivos)
        {
            this.context = context;
            this.almacenadorArchivos = almacenadorArchivos;
        }


        [HttpGet("listarCatalogos")]
        public async Task<ActionResult<List<bd_Catalogo>>> Get(string estado = "all", string tipo = "all")
        {
            List<bd_Catalogo> catalogosFiltrados;
            if (estado == "all" && tipo == "all")
            {
                catalogosFiltrados = await context.bd_Catalogo.ToListAsync();
            }
            else
            {
                if (estado == "HABILITADO" && tipo == "all")
                {
                    catalogosFiltrados = await context.bd_Catalogo.Where(c => c.estado == estado).ToListAsync();
                }
                else
                {
                    catalogosFiltrados = await context.bd_Catalogo.Where(c => c.estado == estado && c.tipocatalogo == tipo).ToListAsync();
                }
            }
            if (catalogosFiltrados.Count > 0)
            {
                for (int i = 0; i < catalogosFiltrados.Count; i++)
                {
                    var rutaFoto = catalogosFiltrados[i].foto;
                    if (rutaFoto != null)
                    {
                        System.Net.WebClient webClient = new System.Net.WebClient();
                        byte[] imageBytes = webClient.DownloadData(rutaFoto);
                        string base64String = System.Convert.ToBase64String(imageBytes);
                        string imageSrc = "data:image/jpeg;base64," + base64String;
                        catalogosFiltrados[i].foto = imageSrc;
                    }
                }
            }
            var response = new ResponseDto<List<bd_Catalogo>>()
            {
                statusCode = StatusCodes.Status200OK,
                fechaConsulta = DateTime.Now,
                codigoRespuesta = 1001,
                MensajeRespuesta = "CORRECTO",
                datos = catalogosFiltrados
            };
            return Ok(response);


            //var inventario = await context.bd_Inventario.Where(x => x.IdtipoInventario == tipoFormulario).ToListAsync();

            //var response = new ResponseDto<List<dto_Inventario>>()
            //{
            //    statusCode = StatusCodes.Status200OK,
            //    fechaConsulta = DateTime.Now,
            //    codigoRespuesta = 1001,
            //    MensajeRespuesta = "CORRECTO",
            //    datos = mapper.Map<List<dto_Inventario>>(inventario)
            //};
            //return Ok(response);
        }

        [HttpGet("listarPromocionesNovedades")]
        public async Task<ActionResult<List<bd_Catalogo>>> GetNovedadCatalogo(string novedad)
        {
            List<bd_Catalogo> catalogosFiltrados;

            if (novedad != "")
            {
                catalogosFiltrados = await context.bd_Catalogo.Where(c => c.novedad == novedad).ToListAsync();
                if (catalogosFiltrados.Count > 0)
                {
                    for (int i = 0; i < catalogosFiltrados.Count; i++)
                    {
                        var rutaFoto = catalogosFiltrados[i].foto;
                        if (rutaFoto != null)
                        {
                            System.Net.WebClient webClient = new System.Net.WebClient();
                            byte[] imageBytes = webClient.DownloadData(rutaFoto);
                            string base64String = System.Convert.ToBase64String(imageBytes);
                            string imageSrc = "data:image/jpeg;base64," + base64String;
                            catalogosFiltrados[i].foto = imageSrc;
                        }
                    }
                }
                var response = new ResponseDto<List<bd_Catalogo>>()
                {
                    statusCode = StatusCodes.Status200OK,
                    fechaConsulta = DateTime.Now,
                    codigoRespuesta = 1001,
                    MensajeRespuesta = "CORRECTO",
                    datos = catalogosFiltrados
                };
                return Ok(response);
            }
            else
            {
                return NotFound("");
            }


        }




        [HttpPost("CrearCatalogo")]
        public async Task<ActionResult<ResponseDto<bd_Catalogo>>> CrearCatalogo([FromForm] dto_Catalogo request)
        {
            try
            {
                DateTime FechaCreacion = DateTime.Now.ToUniversalTime();
                DateTime FechaModificacion = DateTime.Now.ToUniversalTime();

                var catalogo = new bd_Catalogo()
                {
                    fechaCreacion = FechaCreacion,
                    fechaModificacion = FechaModificacion,
                    estado = "HABILITADO",
                    nombre = request.nombre,
                    descripcion = request.descripcion,
                    tipocatalogo = request.tipocatalogo,
                    novedad = request.novedad,
                };
                if (request.foto != null)
                {
                    catalogo.foto = await almacenadorArchivos.GuardarArchivo(contenedor, request.foto);
                }
                await context.AddAsync(catalogo);
                await context.SaveChangesAsync();
                var response = new ResponseDto<bd_Catalogo>()
                {
                    statusCode = StatusCodes.Status200OK,
                    fechaConsulta = DateTime.Now,
                    codigoRespuesta = 1001,
                    MensajeRespuesta = "CORRECTO",
                    datos = catalogo
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
