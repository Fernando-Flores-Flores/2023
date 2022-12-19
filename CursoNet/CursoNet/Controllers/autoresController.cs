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
    public class autoresController : ControllerBase
    {
        private readonly IMapper mapper;

        public ApplicationDbContext Context { get; }
        public ILogger<autoresController> Logger { get; }

        public autoresController(ApplicationDbContext context,ILogger<autoresController> logger,IMapper mapper)
        {
            Context = context;
            Logger = logger;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<Autor>>> Get()
        {
            //Logger.LogInformation("Estamos recibiendo los autores");
            //return await Context.Autores.Include(x=>x.libros).ToListAsync();
            var autores = await Context.Autores.ToListAsync();
            return Ok(mapper.Map<List<AutorDto>>(autores));
        }

        [HttpGet ("{id:int}")]
        public async Task<ActionResult<AutorDto>> Get(int id)
        {
            var autor = await Context.Autores.FirstOrDefaultAsync(x=>x.Id == id);
            return Ok(mapper.Map<AutorDto>(autor));
        }


        [HttpGet("primero")]
        public async Task<ActionResult<Autor>> PrimerAutor()
        {

            return await Context.Autores.Include(x => x.libros).FirstOrDefaultAsync();
        }


        [HttpPost]
        public async Task<ActionResult> Post([FromBody] autorCreacionDTo autorCreacion)
        {
            var existe= await Context.Autores.AnyAsync(x=>x.Nombre== autorCreacion.nombre);
            if (existe) {
                return BadRequest($"El autor con el nombre {autorCreacion.nombre} ya existe en la base de datos");
            }
            var autor = mapper.Map<Autor>(autorCreacion);
            Context.Add(autor);
            await Context.SaveChangesAsync();
            return Ok(autor);

        }
        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(Autor autor, int id)
        {

            if (autor.Id != id)
            {
                return BadRequest("El Id del autor  no coincide con el id de la URL");
            }
            var existe = await Context.Autores.AnyAsync(x => x.Id == id);

            if (!existe)
            {
                return NotFound();
            }
            Context.Update(autor);
            await Context.SaveChangesAsync();
            return Ok();

        }
        [HttpDelete("{id:int}")]
        public async Task<ActionResult> EliminarAutor(int id)
        {
            var existe = await Context.Autores.AnyAsync(x => x.Id == id);

            if (!existe)
            {
                return NotFound();
            }
            Context.Remove(new Autor() { Id = id });
            await Context.SaveChangesAsync();
            return Ok();
        }
    }
}
