namespace BackEnd2023.dtos
{
    public class UsuarioOutDto
    {
        public PersonaOutDto Persona { get; set; }
        public string usuarioNombre { get; set; }
        public string password { get; set; }
        public int idRol { get; set; }
        public int idPersona { get; set; }
    }
}
