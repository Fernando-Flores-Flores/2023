using BackEnd2023.dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using WhatsAppApi;

namespace BackEnd2023.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MensajesController : ControllerBase
    {
        public MensajesController()
        {

        }

        [HttpGet("EnviarMensaje")]
        public async Task<ActionResult<ResponseDto<string>>> EnviarMensaje()
        {

            // Crea una instancia de la clase WhatsApp
            WhatsApp wa = new WhatsApp("59163069754", "12345", "Fernando", false, false);

            try
            {
                // Conecta y autentica con el servidor de WhatsApp
                wa.Connect();
                wa.Login();

                // Envía el mensaje
                wa.SendMessage("recipient_phone_number", "message_text");

                // Desconéctate del servidor de WhatsApp
                wa.Disconnect();
                var response = new ResponseDto<string>()
                {
                    statusCode = StatusCodes.Status200OK,
                    fechaConsulta = DateTime.Now,
                    codigoRespuesta = 1001,
                    MensajeRespuesta = "CORRECTO",
                    datos = "Enviado"
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
