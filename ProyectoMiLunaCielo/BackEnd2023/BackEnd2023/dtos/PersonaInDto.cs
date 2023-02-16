namespace BackEnd2023.dtos
{
    public class PersonaInDto
    {
        public string ci_persona { get; set; }
        public string a_paterno { get; set; }
        public string a_materno { get; set; }
        public string celular { get; set; }
        public string nombre { get; set; }
        public string direccion { get; set; }
        public string correo_electronico { get; set; }
        public IFormFile? foto { get; set; }

    }
}
