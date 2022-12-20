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

        public UsuarioController(ILogger<UsuarioController> logger)
        {
            this.logger = logger;
        }

        [HttpPost("CrearUsuarioPost")]
        public async Task<ActionResult<ResponseDto<long>>> PostUsuario([FromBody] UsuarioInDto request)
        {
            try
            {
                var response = new ResponseDto<UsuarioOutDto>()
                {
                    statusCode = StatusCodes.Status200OK,
                    fechaConsulta = DateTime.Now,
                    codigoRespuesta = 1001,
                    MensajeRespuesta = "CORRECTO",
                    datos = new UsuarioOutDto()
                    {
                        //IdUsuarioSolicitud = respIdCabecera,
                        //IdUsuarioHabilitado = respUserId,
                    }
                };

                return Ok(response);

            }
            catch (Exception e)
            {
                logger.LogError(e, e.Message);
                return NotFound("Entro al catch");
            }
        }

      //  [HttpPost("SolUserEmpresa")]
      //  public async Task<ActionResult<ResponseDto<long>>> GuardarUsuariosHabilitadoEmpresa(
      //[FromBody] SolicitudesUserHabilitadoInDto request, string tipoFirma)
      //  {
      //      string doccompl;

      //      try
      //      {
      //          DateTime FechaNac, FechaMod, FechaNacHab;

      //          var valido = DateTime.TryParseExact(request.FechaNacimientoRl, "dd/MM/yyyy", null, System.Globalization.DateTimeStyles.None, out FechaNac);
      //          var validos = DateTime.TryParseExact(request.FechaModificacion, "dd/MM/yyyy", null, System.Globalization.DateTimeStyles.None, out FechaMod);
      //          var validoss = DateTime.TryParseExact(request.FechaNacimientoHab, "dd/MM/yyyy", null, System.Globalization.DateTimeStyles.None, out FechaNacHab);

      //          if (request.ComplementoRl != null)
      //          {
      //              if (request.ComplementoRl != "")
      //              {
      //                  doccompl = request.NumeroIdentidadRl + "-" + request.ComplementoRl;
      //                  request.ComplementoRl = request.ComplementoRl.Trim().ToUpper();
      //              }
      //          }
      //          else
      //          if (request.ComplementoRl == null)
      //          {
      //              request.ComplementoRl = "";
      //          }

      //          var estadoSipEmp = "S";
      //          if (request.TipoIdentificacion == "GOB")
      //          {
      //              request.NumeroIdentificacion = request.EntidadGob.Trim();
      //          }
      //          var numeroEmpresa = request.NumeroIdentificacion.Trim();
      //          if (request.TipoIdentificacion != "GOB")
      //          {
      //              var urlBaseCenempresasSip = config.GetSection("API").GetValue<string>("UrlBaseCenEmpresasSip");
      //              ProxyC proxyCenempresasSip = new ProxyC(urlBaseCenempresasSip);
      //              var respuesta = await proxyCenempresasSip.ObtenerEmpresaPorTipoyNumero(request.TipoIdentificacion, request.NumeroIdentificacion);
      //              if (respuesta != null)
      //              {
      //                  estadoSipEmp = "G";
      //              }
      //          }
      //          else if (request.TipoIdentificacion == "GOB")
      //          {
      //              numeroEmpresa = Convert.ToString(request.EntidadGob.Trim());
      //              estadoSipEmp = "G";
      //          }

      //          long respIdCabecera = 0;
      //          var resEmpresa = await oficinaVirtualDbContext.GetSolicitudEmpresaRegistrada(request.TipoIdentificacion, numeroEmpresa);

      //          if (resEmpresa == null)
      //          {
      //              var solUserEmpresa = new SolicitudesUsuarios()
      //              {
      //                  TipoIdentificacion = request.TipoIdentificacion,
      //                  NumeroIdentificacion = numeroEmpresa,
      //                  EntidadGob = numeroEmpresa,
      //                  RazonSocial = request.RazonSocial.Trim(),
      //                  DireccionAdminsitrativa = request.DireccionAdminsitrativa,
      //                  UnidadEjecutora = request.UnidadEjecutora,
      //                  Urh = request.Urh,
      //                  MatriculaComercio = request.Matricula,
      //                  CelularRl = request.CelularRl.Trim(),
      //                  EmailRl = request.EmailRl.Trim(),
      //                  CuaRl = request.CuaRl,
      //                  Afp = request.afpRl,
      //                  Cooperativa = request.Cooperativa,
      //                  //*********************************************** representate legal
      //                  TipoIdentidadRl = request.TipoIdentidadRl,
      //                  NumeroIdentidadRl = request.NumeroIdentidadRl.Trim(),
      //                  ComplementoRl = request.ComplementoRl.Trim(),
      //                  PrimerNombreRl = request.PrimerNombreRl.Trim(),
      //                  SegundoNombreRl = request.SegundoNombreRl.Trim(),
      //                  PrimerApellidoRl = request.PrimerApellidoRl.Trim(),
      //                  SegundaApellidoRl = request.SegundaApellidoRl.Trim(),
      //                  ApellidoCasadaRl = request.ApellidoCasadaRl.Trim(),
      //                  DocIdentidadComplRl = request.DocIdentidadComplRl,
      //                  FechaNacimientoRl = FechaNac,

      //                  //********************************************** datos de base
      //                  FechaModificacion = FechaMod,
      //                  TipoUsuario = request.TipoUsuario,
      //                  ApiTransaccion = request.ApiTransaccion,
      //                  UsuarioCrea = "webvirtual",
      //                  EstadoSolicitud = "R"
      //              };

      //              respIdCabecera = await this.oficinaVirtualDbContext.GuardarSolicitudUsuario(solUserEmpresa);

      //              var rolUser = new db.Tablas.General.RolesSolicitudesUsuarios()
      //              {
      //                  IdUsuarioSolicitud = respIdCabecera,
      //                  // FirmaUsuario = tipoFirma,
      //                  EstadosIP = estadoSipEmp,
      //                  FechaCreacion = DateTime.Now,
      //                  FechaModificacion = DateTime.Now
      //              };
      //              var respRol = await this.oficinaVirtualDbContext.GuardarRolSolicitudUsuario(rolUser);
      //          }
      //          else
      //          {
      //              respIdCabecera = resEmpresa.IdUsuarioSolicitud;
      //              if (resEmpresa.Cooperativa == null)
      //              {
      //                  var rep = await this.oficinaVirtualDbContext.ActualizarCoop(respIdCabecera, request.Cooperativa);
      //              }
      //          }

      //          var respUsuarioHab = await oficinaVirtualDbContext.GetSolicitudUserEmpresa(request.TipoIdentificacion, request.NumeroIdentificacion, request.TipoIdentidadHab, request.NumeroIdentidadHab, request.ComplementoHab, respIdCabecera);

      //          long respUserId = 0;

      //          if (respUsuarioHab == null)
      //          {
      //              if (request.ComplementoHab != null)
      //              {
      //                  if (request.ComplementoHab != "")
      //                  {
      //                      request.ComplementoHab = request.ComplementoHab.Trim().ToUpper();
      //                  }
      //              }
      //              else
      //              if (request.ComplementoHab == null)
      //              {
      //                  request.ComplementoHab = "";
      //              }
      //              var UserHab = new Usuarios()
      //              {
      //                  IdSolUsuario = respIdCabecera,
      //                  TipoDocumento = request.TipoIdentidadHab,
      //                  NumeroDocumento = request.NumeroIdentidadHab.Trim(),
      //                  Complemento = request.ComplementoHab,
      //                  PrimerNombre = request.PrimerNombreHab,
      //                  SegundoNombre = request.SegundoNombreHab,
      //                  PrimerApellido = request.PrimerApellidoHab,
      //                  SegundoApellido = request.SegundaApellidoHab,
      //                  Casada = request.ApellidoCasadaHab,
      //                  FechaNacimiento = FechaNacHab,
      //                  DocumentoComplemento = request.DocIdentidadComplHab,
      //                  Celular = request.CelularHab.Trim(),
      //                  Email = request.EmailHab.Trim(),
      //                  Cua = request.CuaHab,
      //                  Afp = request.AfpHab,
      //                  FechaRegistro = DateTime.Now,
      //                  FirmaAtc = tipoFirma,
      //                  UsuarioCrea = "OficinaVirtual",
      //                  DepartamentoHabilitado = request.DepartamentoHabilitado,

      //              };
      //              respUserId = await this.oficinaVirtualDbContext.GuardarUsuarios(UserHab);

      //              if (request.UsuarioDireccionAdmin.Count > 0)
      //              {
      //                  foreach (var item in request.UsuarioDireccionAdmin)
      //                  {
      //                      var UsuarioDea = new UsuarioControlaDireccionAdminInDto()
      //                      {
      //                          Entidad = item.Entidad,
      //                          Da = item.Da,
      //                          Uej = item.Uej,
      //                          DescripcionEntidad = item.DescripcionEntidad,
      //                          DescripcionDa = item.DescripcionDa,
      //                          DescripcionUnidad = item.DescripcionUnidad,
      //                          Estado = "ASIGNADO",
      //                          FechaEstado = DateTime.Now,
      //                          FechaModificacion = DateTime.Now,
      //                          IdSolicitudUsuario = respIdCabecera,
      //                          IdUsuarioHabilitado = respUserId,
      //                          IdClaEntidadDa = item.IdClaEntidadDa,
      //                          IdEmpresa = item.IdEmpresa,
      //                          IdDirecciones = item.IdDirecciones,
      //                      };
      //                      var respSucursalId = await this.oficinaVirtualDbContext.RegistrarUsuarioDea(UsuarioDea);
      //                  }
      //              }

      //              if (request.RespaldosUsuarios.Count > 0)
      //              {
      //                  foreach (var item in request.RespaldosUsuarios)
      //                  {
      //                      var Respaldos = new UsuariosRespaldos()
      //                      {
      //                          IdUsuario = respIdCabecera,
      //                          IdHabilitado = respUserId,
      //                          Respaldo = item.Respaldo,
      //                          Imagen = item.Imagen,
      //                          DescripcionImagen = item.DescripcionImagen,
      //                          UsuarioCrea = "OficinaVirtual",
      //                          Transaccion = "CREAR",
      //                      };
      //                      var respuestaId = await this.oficinaVirtualDbContext.GuardarRespaldoSolicitudUsuarios(Respaldos);
      //                  }
      //              }
      //          }
      //          var response = new ResponseDto<SolicitudesUsuariosOutDto>()
      //          {
      //              statusCode = StatusCodes.Status200OK,
      //              fechaConsulta = DateTime.Now,
      //              codigoRespuesta = 1001,
      //              MensajeRespuesta = "CORRECTO",
      //              datos = new SolicitudesUsuariosOutDto()
      //              {
      //                  IdUsuarioSolicitud = respIdCabecera,
      //                  IdUsuarioHabilitado = respUserId,
      //              }
      //          };

      //          return Ok(response);
      //      }
      //      catch (Exception e)
      //      {
      //          logger.LogError(e, e.Message);
      //          return DetalleProblemaHelper.InternalServerError(HttpContext.Request, detail: e.Message);
      //      }
      //  }





    }
}
