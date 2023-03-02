using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackEnd2023.Entidades
{
    [Table("bd_catalogo", Schema = "public")]
    public class bd_Catalogo
    {
        [Key]
        public int id { get; set; }
        public DateTime? fechaCreacion { get; set; }
        public DateTime? fechaModificacion { get; set; }
        public string? estado { get; set; }
        public string? nombre { get; set; }
        public string? foto { get; set; }
        public string? descripcion { get; set; }
        public string? tipocatalogo { get; set; }
        public string? novedad { get; set; }

    }
}
