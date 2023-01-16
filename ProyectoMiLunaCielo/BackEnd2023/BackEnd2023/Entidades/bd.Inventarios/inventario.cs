using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackEnd2023.Entidades.bd.Inventarios
{
    public class inventario
    {
        [Key]
        public int Id { get; set; }

        [Column("id_tipoInventario")]
        public string IdtipoInventario { get; set; }
        public string codigo { get; set; }
        public long cantidad { get; set; }
        public string oficina { get; set; }
        public string descripcion { get; set; }

        public string observaciones { get; set; }
        public string area { get; set; }
        public DateTime fechaCreacion { get; set; }

        public DateTime fechaModificacion { get; set; }
        public string estado { get; set; }
    }
}
