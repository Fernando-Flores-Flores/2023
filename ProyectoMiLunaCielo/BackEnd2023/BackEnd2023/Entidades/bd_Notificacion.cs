using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackEnd2023.Entidades
{
    [Table("bd_notificaciones", Schema = "public")]
    public class bd_Notificacion
    {
        [Key]
        public int id { get; set; }
        public DateTime? fechaCreacion { get; set; }
        public DateTime? fechaModificacion { get; set; }

        [Column("id_envia_user")]
        public string? idUsuarioEnvia { get; set; }

        [Column("id_recibe_user")]
        public string? idUsuarioRecibe { get; set; }
        public string? mensaje { get; set; }
        public bool? leido { get; set; }
        public DateTime? fechaleido { get; set; }
    }
}

