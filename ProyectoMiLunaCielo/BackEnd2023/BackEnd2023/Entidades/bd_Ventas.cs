using System.ComponentModel.DataAnnotations.Schema;

namespace BackEnd2023.Entidades
{
    [Table("bd_ventas", Schema = "public")]
    public class Ventas
    {
        public int Id{ get; set; }
        public string codigoVenta { get; set; }

        public long cantidad{ get; set; }

        public string? descripcionVenta { get; set; }

        public string? observaciones { get; set; }
        public DateTime fechaCreacion { get; set; }

        public DateTime fechaModificacion { get; set; }
        public string? estadoVenta { get; set; }
    }
}
