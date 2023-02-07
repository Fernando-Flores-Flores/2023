using System.ComponentModel.DataAnnotations.Schema;

namespace BackEnd2023.dtos
{
    public class OrdenTrabajoDTO
    {
        [Column("fechaorden")]
        public DateTime? FechaOrden { get; set; }

        [Column("tipotrabajo")]
        public string? TipoTrabajo { get; set; }
        [Column("descripcion")]
        public string? Descripcion { get; set; }
        [Column("costo")]
        public long? costo { get; set; }

        [Column("fechaentregaaprox")]
        public DateTime? FechaEntregaAprox { get; set; }
        [Column("observaciones")]
        public string? Observaciones { get; set; }
        [Column("tipopago")]
        public string? TipoPago { get; set; }
        [Column("idpersonalasignado")]
        public string? idPersonalAsignado { get; set; }

        public PersonaInDto Cliente { get; set; }
    

    }
}
