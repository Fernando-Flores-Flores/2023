using BackEnd2023.Entidades;
using Microsoft.EntityFrameworkCore;

namespace BackEnd2023
{
    public class ApplicationDbContext:DbContext
    {
        public ApplicationDbContext(DbContextOptions options):base(options)
        {

        }
        public DbSet <persona> bd_Persona{ get; set; }
        public DbSet<roles> bd_Role { get; set; }
        public DbSet<usuario> bd_Usuario { get; set; }

        public async Task<long> GuardarUsuario(usuario usuario)
        {
            try
            {
                await this.AddAsync(usuario);
                await this.SaveChangesAsync();
                return usuario.Id;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message, e.InnerException);
            }
        }
    }
}
