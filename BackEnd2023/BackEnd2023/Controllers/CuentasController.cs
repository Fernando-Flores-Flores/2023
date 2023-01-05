using BackEnd2023.dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
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

        public CuentasController(UserManager<IdentityUser>userManager,IConfiguration configuration, SignInManager<IdentityUser>signInManager
            )
        {
            this.userManager = userManager;
            this.configuration = configuration;
            this.signInManager = signInManager;
        }
        [HttpPost("crear")]
        public async Task<ActionResult<ResponseAutenticacion>> CrearCuentaUsuario([FromBody] CredencialesUsuario credenciales)
        {
            var usuarioEntity = new IdentityUser { UserName = credenciales.Email, Email = credenciales.Email };
            var resultado = await userManager.CreateAsync(usuarioEntity,credenciales.password);
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
            var claimsDB= await userManager.GetClaimsAsync(usuario);
            claims.AddRange(claimsDB);

            var llave = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["llaveJWT"]));
            var creds=new SigningCredentials(llave,SecurityAlgorithms.HmacSha256);
            var expiracion=DateTime.Now.AddDays(1);
            var token=new JwtSecurityToken(issuer:null,audience:null,claims:claims,expires:expiracion, signingCredentials:creds);

            return new ResponseAutenticacion()
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Expiracion = expiracion,
            };

        }
    }
}
