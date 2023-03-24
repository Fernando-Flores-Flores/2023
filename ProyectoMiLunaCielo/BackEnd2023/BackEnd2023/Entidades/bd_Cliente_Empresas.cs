using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackEnd2023.Entidades
{
    [Table("bd_cliente_empresa", Schema = "public")]
    public class bd_Cliente_Empresas
    {
        [Key]
        public int id { get; set; }

        [Column("fechacreacion")]
        public DateTime? fechaCreacion { get; set; }

        [Column("fechamodificacion")]
        public DateTime? fechaModificacion { get; set; }
        public string? nombre { get; set; }
        public string? nit { get; set; }

        [Column("nro_celular")]
        public int? celular { get; set; }
     
    }
}
