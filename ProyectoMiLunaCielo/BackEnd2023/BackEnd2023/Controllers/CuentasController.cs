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

        public CuentasController(UserManager<IdentityUser> userManager, IConfiguration configuration, SignInManager<IdentityUser> signInManager, ApplicationDbContext context, IMapper mapper
            )
        {
            this.userManager = userManager;
            this.configuration = configuration;
            this.signInManager = signInManager;
            this.context = context;
            this.mapper = mapper;
        }
        [HttpPost("crear")]
        public async Task<ActionResult<ResponseAutenticacion>> CrearCuentaUsuario([FromBody] CredencialesUsuario credenciales)
        {
            var usuarioEntity = new IdentityUser { UserName = credenciales.Email, Email = credenciales.Email };
            var resultado = await userManager.CreateAsync(usuarioEntity, credenciales.password);
            if (resultado.Succeeded)
            {
                return await ConstruirToken(credenciales);
            }
            else
            {
                return BadRequest(resultado.Errors);
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


        private async Task<ResponseAutenticacion> ConstruirToken(CredencialesUsuario credenciales)
        {
            //Claims es un ocnjunto de informacion del usuario, lo que se puede mostrar
            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Email, credenciales.Email),
                new Claim(ClaimTypes.Role,"Rol"),

            };
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

        [HttpGet("listadoUsuarios")]
        //public async Task<ActionResult<List<usuarioDTO>>> ListadoUsuario([FromQuery]PaginacionDTO paginacionDTO) { 
        public async Task<ActionResult<List<usuarioDTO>>> ListadoUsuario()
        {

            //var queryable = context.Users.AsQueryable();
            //    await HttpContext.InsertarParametrosPaginacionEnCabecera(queryable);
            //    var usuarios = await queryable.OrderBy(x => x.Email).Paginar(paginacionDTO).ToListAsync();
            //return mapper.Map<List<usuarioDTO>>(usuarios);
            var listaUsuario = await context.Users.ToListAsync();

            //var listaRoles = await context.UserClaims.ToListAsync();

            //return Ok(mapper.Map<List<AutorDto>>(autores));

            //var resultado = await (from usuario in listaUsuario
            //                       join rol in listaRoles on usuario.Id equals rol.UserId into roles
            //                       select new usuarioDTO
            //                       {
            //                           Id = usuario.Id,
            //                           Email = usuario.Email,
            //                           roles = roles.ToList<IdentityUserClaim<string>>()
            //                       }).ToList();

            // var listaUsuarios = await userManager.GetUsersInRoleAsync("admin");
            var listadoDeUsuariosConClaims = new List<usuarioDTO>();
            foreach (var usuario in listaUsuario)
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




            //  List<usuarioDTO> usuariosEnviar = new List<usuarioDTO>();
            //  foreach (var item in listaUsuario)
            //  {

            //usuariosEnviar.Add(
            //new usuarioDTO()
            //{
            //    Id = int.Parse(string.Concat(item.DepartamentoId, item.ProvinciaId, item.SeccionId, item.CantonId)),
            //    CodigoGeograficoId = item.Id,
            //    DepartamentoId = item.DepartamentoId,
            //    ProvinciaId = item.ProvinciaId,
            //    CantoId = item.CantonId,
            //    SeccionId = item.SeccionId,
            //    Departamento = item.Departamento,
            //    Provincia = item.Provincia,
            //    Seccion = item.Seccion,
            //    Descripcion = item.Ciudad
            //}


            //     }
            var response = new ResponseDto<object>()
            {
                statusCode = StatusCodes.Status200OK,
                fechaConsulta = DateTime.Now,
                codigoRespuesta = 1001,
                MensajeRespuesta = "CORRECTO",
                datos = listadoDeUsuariosConClaims,
                // roles= listaRoles
                //datos = new List<usuarioDTO>()
                //{
                //   listaUsuario= listaUsuario,
                //}
            };
            return Ok(response);


        }


        [HttpPost("hacerAdmin")]
        public async Task<ActionResult> HacerAdmin([FromBody] string usuarioId)
        {
            var usuario = await userManager.FindByIdAsync(usuarioId);
            await userManager.AddClaimAsync(usuario, new Claim("role", "admin"));
            var response = new ResponseDto<long>()
            {
                statusCode = StatusCodes.Status200OK,
                fechaConsulta = DateTime.Now,
                codigoRespuesta = 1001,
                MensajeRespuesta = "CORRECTO",
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

    }
}
