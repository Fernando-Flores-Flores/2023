using BackEnd2023.Entidades;
using BackEnd2023.Entidades.bd.Inventarios;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BackEnd2023
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {

        }
        public ApplicationDbContext()
        {
        }
        public DbSet<persona> bd_Persona { get; set; }
        // public DbSet<roles> bd_Role { get; set; }
        public DbSet<usuario> bd_Usuario { get; set; }

        public DbSet<inventario> bd_Inventario { get; set; }

        public DbSet<Ventas> bd_Ventas { get; set; }


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
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseNpgsql("Server=localhost;Database=Cielo;Port=5432;User Id=postgres;Password=admin;");
            }
        }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}
