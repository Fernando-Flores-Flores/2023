namespace BackEnd2023.Entidades
{
    public class usuario
    {
        public int Id { get; set; }
        public string usuarioNombre { get; set; }
        public string password { get; set; }
        public int idRol { get; set; }
        public int idPersona { get; set; }
        public persona Persona { get; set; }

    }
}
