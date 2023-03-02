using System.ComponentModel.DataAnnotations;

namespace BackEnd2023.dtos
{
    public class dto_Catalogo
    {
        public string? nombre { get; set; }
        public IFormFile? foto { get; set; }
        public string? descripcion { get; set; }
        public string? tipocatalogo { get; set; }
        public string novedad { get; set; }
    }
}
