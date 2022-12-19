using System.ComponentModel.DataAnnotations;

namespace CursoNet.DTOs
{
    public class autorCreacionDTo
    {
        [Required(ErrorMessage ="El campo {0} es requerido")]
        public string nombre { get; set; }
    }
}
