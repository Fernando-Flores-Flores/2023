using CursoNet.Entidades;
using Microsoft.EntityFrameworkCore;

namespace CursoNet
{
    public class ApplicationDbContext:DbContext
    {
        public ApplicationDbContext(DbContextOptions options):base(options)
        {

        }
        //Autores será el nombre de la tabla en postgres (Creame una tabla a partir de la clase Autor y y que se llame Autores).
        public DbSet<Autor> Autores { get; set; }
        public DbSet<Libro> Libros { get; set; }


    }
}
