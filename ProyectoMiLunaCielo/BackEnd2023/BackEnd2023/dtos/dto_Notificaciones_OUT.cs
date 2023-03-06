namespace BackEnd2023.dtos
{
    public class dto_Notificaciones_OUT
    {
        public string? idUsuarioEnvia { get; set; }
        public string? idUsuarioRecibe { get; set; }
        public string? mensaje { get; set; }
        public bool? leido { get; set; }
        public DateTime? fechaleido { get; set; }
        public DateTime? fechaCreacion { get; set; }
        public string? foto { get; set; }
        public string? nombre { get; set; }



    }
}
