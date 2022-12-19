using AutoMapper;
using CursoNet.DTOs;
using CursoNet.Entidades;

namespace CursoNet.Utilidades
{
    public class AutoMapperProfiles:Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<autorCreacionDTo, Autor>();
            CreateMap<Autor, AutorDto>();
            CreateMap<LibroCreacionDto, Libro>();
            CreateMap<Libro,LibroDto>();



        }
    }
}
