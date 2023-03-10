using AutoMapper;
using BackEnd2023.dtos;
using BackEnd2023.Entidades;
using BackEnd2023.Utilitarios;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BackEnd2023.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CuentasController : ControllerBase
    {
        private readonly UserManager<IdentityUser> userManager;
        private readonly IConfiguration configuration;
        private readonly SignInManager<IdentityUser> signInManager;
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;
        private readonly ILogger<UsuarioController> logger;
        private readonly IAlmacenadorArchivos almacenadorArchivos;
        private readonly string contenedor = "personas";

        public CuentasController(UserManager<IdentityUser> userManager, IConfiguration configuration, SignInManager<IdentityUser> signInManager, ApplicationDbContext context, IMapper mapper, ILogger<UsuarioController> logger, IAlmacenadorArchivos almacenadorArchivos
            )
        {
            this.userManager = userManager;
            this.configuration = configuration;
            this.signInManager = signInManager;
            this.context = context;
            this.mapper = mapper;
            this.logger = logger;
            this.almacenadorArchivos = almacenadorArchivos;
        }

        [HttpPost("CrearCuentaUsuario")]
        public async Task<ActionResult<ResponseAutenticacion>> CrearCuentaUsuario([FromForm] PersonaInDto request)
        {
            try
            {
                var idAsignado = "";
                var usuarioEntity = new IdentityUser { UserName = request.correo_electronico, Email = request.correo_electronico };

                using (var transaction = context.Database.BeginTransaction())
                {
                    try
                    {
                        var resultado = await userManager.CreateAsync(usuarioEntity, "Tempo.2023@");
                        if (resultado.Succeeded)
                        {
                            var usuarioCreado = await userManager.FindByNameAsync(usuarioEntity.UserName);
                            idAsignado = usuarioCreado.Id;
                        }
                        else
                        {
                            return BadRequest(resultado.Errors);
                        }

                        var cliente = new persona()
                        {
                            ci_persona = request.ci_persona.Trim(),
                            a_paterno = request.a_paterno.Trim().ToUpper(),
                            a_materno = request.a_materno.Trim().ToUpper(),
                            nombre = request.nombre.Trim().ToUpper(),
                            celular = request.celular,
                            direccion = request.direccion.Trim().ToUpper(),
                            correo_electronico = request.correo_electronico.Trim(),
                            idUsuario = idAsignado
                        };
                        if (request.foto != null)
                        {
                            cliente.foto = await almacenadorArchivos.GuardarArchivo(contenedor, request.foto);
                        }

                        await context.AddAsync(cliente);
                        await context.SaveChangesAsync();

                        transaction.Commit();
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
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                        throw ex;
                        return BadRequest(ex.Message);
                    }
                }
            }
            catch (Exception e)
            {
                logger.LogError(e, e.Message);
                return NotFound(e.Message);
            }
        }


        [HttpPost("login")]
        public async Task<ActionResult<ResponseAutenticacion>> loginUsuario([FromBody] CredencialesUsuario credenciales)
        {
            var resultado = await signInManager.PasswordSignInAsync(credenciales.Email, credenciales.password, isPersistent: false, lockoutOnFailure: false);
            if (resultado.Succeeded)
            {
                return await ConstruirToken(credenciales);
            }
            else
            {
                return BadRequest("Inicio de sesion incorrecto, verifique sus credenciales");
            }

        }


        private async Task<ActionResult<ResponseAutenticacion>> ConstruirToken(CredencialesUsuario credenciales)
        {
            try
            {
                var response = new ResponseDto<List<persona>>();
                List<persona> personasFiltradas;
                var userId = "";
                var nombreUsuarioLogeado = "";
                var rutaFoto = "";

                var user = await userManager.FindByEmailAsync(credenciales.Email);
                var result = await userManager.CheckPasswordAsync(user, credenciales.password);
                if (result)
                {
                    userId = user.Id;
                    personasFiltradas = await context.bd_Persona.Where(x => x.idUsuario == userId).ToListAsync();
                    nombreUsuarioLogeado = personasFiltradas[0].nombre + " " + personasFiltradas[0].a_paterno;
                    rutaFoto = personasFiltradas[0].foto;

                }

                //Claims es un ocnjunto de informacion del usuario, lo que se puede mostrar
                var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Email, credenciales.Email),
                new Claim(ClaimTypes.Role,"Rol"),

            };
                Claim idClaim = new Claim("Id", userId);
                Claim nombreUserLogeado = new Claim("nombreUsuarioLogeado", nombreUsuarioLogeado);
                if (rutaFoto != null)
                {
                    System.Net.WebClient webClient = new System.Net.WebClient();
                    byte[] imageBytes = webClient.DownloadData(rutaFoto);
                    string base64String = System.Convert.ToBase64String(imageBytes);
                    string imageSrc = "data:image/jpeg;base64," + base64String;
                    Claim rutaFotoUserLogeado = new Claim("rutaFoto", imageSrc);
                    claims.Add(rutaFotoUserLogeado);

                }


                claims.Add(idClaim);
                claims.Add(nombreUserLogeado);
                var usuario = await userManager.FindByEmailAsync(credenciales.Email);
                var claimsDB = await userManager.GetClaimsAsync(usuario);
                claims.AddRange(claimsDB);

                var llave = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["llaveJWT"]));
                var creds = new SigningCredentials(llave, SecurityAlgorithms.HmacSha256);
                var expiracion = DateTime.Now.AddDays(1);
                var token = new JwtSecurityToken(issuer: null, audience: null, claims: claims, expires: expiracion, signingCredentials: creds);

                return new ResponseAutenticacion()
                {
                    Token = new JwtSecurityTokenHandler().WriteToken(token),
                    Expiracion = expiracion,
                };
            }
            catch (Exception e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpPost("asignarRol")]
        public async Task<ActionResult> asignarRol([FromBody] string usuarioId, string rol)
        {
            var usuario = await userManager.FindByIdAsync(usuarioId);
            var claims = await userManager.GetClaimsAsync(usuario);
            if (claims.Count == 0)
            {
                await userManager.AddClaimAsync(usuario, new Claim("role", rol));
            }
            else
            {
                var nameClaim = claims.FirstOrDefault(c => c.Type == ClaimTypes.Name);
                List<Claim> claimsToRemove = new List<Claim>();
                foreach (var claim in claims)
                {
                    if (claim.Type == "role")
                    {
                        claimsToRemove.Add(claim);
                    }
                }
                await userManager.RemoveClaimsAsync(usuario, claimsToRemove);
                await userManager.UpdateAsync(usuario);
                await userManager.AddClaimAsync(usuario, new Claim("role", rol));
                claims = await userManager.GetClaimsAsync(usuario);
            }

            var response = new ResponseDto<long>()
            {
                statusCode = StatusCodes.Status200OK,
                fechaConsulta = DateTime.Now,
                codigoRespuesta = 1001,
                MensajeRespuesta = "CORRECTO",
                claims = claims
            };
            return Ok(response);


        }

        [HttpPost("removerAdmin")]
        public async Task<ActionResult> RemoverAdmin([FromBody] string usuarioId)
        {
            var usuario = await userManager.FindByIdAsync(usuarioId);
            await userManager.RemoveClaimAsync(usuario, new Claim("role", "admin"));
            var response = new ResponseDto<long>()
            {
                statusCode = StatusCodes.Status200OK,
                fechaConsulta = DateTime.Now,
                codigoRespuesta = 1001,
                MensajeRespuesta = "EL ROL ADMIN FUE ELIMINADO",
            };
            return Ok(response);
        }


        [HttpGet("listadoUsuarios")]
        public async Task<ActionResult> ListarUsuariosPorTipo(string? rol = "")
        {
            try
            {
                var listaUsuario = await context.Users.ToListAsync();
                var listadoDeUsuariosConClaims = new List<usuarioDTO>();
                foreach (var usuario in listaUsuario)
                {
                    if (rol != "")
                    {
                        var claims = await userManager.GetClaimsAsync(usuario);
                        var claimsByType = claims.Where(c => c.Value == rol).ToList();
                        if (claimsByType.Count() > 0)
                        {
                            var roles = mapper.Map<List<roles>>(claimsByType);
                            var usuarioConClaims = new usuarioDTO
                            {
                                Id = usuario.Id,
                                Email = usuario.Email,
                                Claims = roles
                            };
                            listadoDeUsuariosConClaims.Add(usuarioConClaims);
                        }
                    }
                    else
                    {
                        var claims = await userManager.GetClaimsAsync(usuario);
                        var roles = mapper.Map<List<roles>>(claims);
                        var usuarioConClaims = new usuarioDTO
                        {
                            Id = usuario.Id,
                            Email = usuario.Email,
                            //Claims = claims
                            Claims = roles
                        };
                        listadoDeUsuariosConClaims.Add(usuarioConClaims);
                    }
                }
                var response = new ResponseDto<object>()
                {
                    statusCode = StatusCodes.Status200OK,
                    fechaConsulta = DateTime.Now,
                    codigoRespuesta = 1001,
                    MensajeRespuesta = "CORRECTO",
                    datos = listadoDeUsuariosConClaims,
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
