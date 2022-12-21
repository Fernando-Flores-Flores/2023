namespace BackEnd2023.Entidades
{
    public class persona
    {
        public int Id { get; set; }
        public long idUsuario { get; set; }
        public string ci_persona { get; set; }
        public string a_paterno { get; set; }
        public string a_materno { get; set; }
        public int celular { get; set; }
        public string direccion { get; set; }
        public string correo_electronico { get; set; }
    }
}
