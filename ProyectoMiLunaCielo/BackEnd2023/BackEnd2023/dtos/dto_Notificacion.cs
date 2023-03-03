namespace BackEnd2023.dtos
{
    public class dto_Notificacion
    {
        public string? idUsuarioEnvia { get; set; }
        public string? idUsuarioRecibe { get; set; }
        public string? mensaje { get; set; }
        public bool? leido { get; set; }
        public DateTime? fechaleido { get; set; }
        public DateTime? fechaCreacion { get; set; }
        public DateTime? fechaModificacion { get; set; }
    }
}
