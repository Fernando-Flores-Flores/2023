using AutoMapper;
using CursoNet.DTOs;
using CursoNet.Entidades;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CursoNet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class librosControler : ControllerBase
    {
        private readonly IMapper mapper;

        public ApplicationDbContext Context { get; }

        public librosControler(ApplicationDbContext context, IMapper mapper)
        {
            Context = context;
            this.mapper = mapper;
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult> GetLibros(int id)
        {
            var libro= await Context.Libros.FirstOrDefaultAsync(x => x.Id == id);
            return Ok(mapper.Map<LibroDto>(libro));
        }

        [HttpPost]
        public async Task<ActionResult> PostLibroa(LibroCreacionDto libroCreacionDto)
        {
            //var existeAutor= await Context.Autores.AnyAsync(x=>x.Id == libro.AutorId);
            //if (!existeAutor)
            //{
            //    return BadRequest($"No existe el autor con Id : {libro.AutorId}");
            //}

            var libro = mapper.Map<Libro>(libroCreacionDto);
            Context.Add(libro);
            await Context.SaveChangesAsync();
            return Ok();
        }

}
}
