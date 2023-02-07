using System.ComponentModel.DataAnnotations;

namespace BackEnd2023.Entidades
{
    public class persona
    {
        [Key]
        public int Id { get; set; }
        public string? idUsuario { get; set; }
        public string? ci_persona { get; set; }
        public string? a_paterno { get; set; }
        public string? a_materno { get; set; }
        public string? nombre { get; set; }

        public int? celular { get; set; }
        public string? direccion { get; set; }
        public string? correo_electronico { get; set; }

    }
}
