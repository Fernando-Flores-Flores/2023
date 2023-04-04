using System.ComponentModel.DataAnnotations.Schema;

namespace BackEnd2023.dtos
{
    public class empresaClienteDTO
    {
        public string? nombre { get; set; }
        public string? nit { get; set; }
        public int? celular { get; set; }
    }
}
