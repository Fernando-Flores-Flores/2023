using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackEnd2023.Entidades
{
    [Table("bd_ordentrabajo", Schema = "public")]
    public class ordenTrabajo
    {
        [Key]
        [Column("idordentrabajo")]
        public int IdOrdenTrabajo { get; set; }

        [Column("idcliente")]
        public int IdCliente { get; set; }

        [Column("tipotrabajo")]
        public string? TipoTrabajo { get; set; }
        [Column("descripcion")]
        public string? Descripcion { get; set; }
        [Column("costo")]
        public long? costo { get; set; }

        [Column("observaciones")]
        public string? Observaciones { get; set; }
        [Column("tipopago")]
        public string? TipoPago { get; set; }

        [Column("idpersonalasignado")]
        public string? idPersonalAsignado { get; set; }



        [Column("fechaentregaaprox")]
        public DateTime? FechaEntregaAprox { get; set; }


        [Column("avance")]
        public int? avance { get; set; }

        [Column("estado")]
        public string? estado { get; set; }

        [Column("fechaorden")]
        public DateTime? FechaOrden { get; set; }
        public DateTime? fechaCreacion { get; set; }
        public DateTime? fechaModificacion { get; set; }
    }
}
