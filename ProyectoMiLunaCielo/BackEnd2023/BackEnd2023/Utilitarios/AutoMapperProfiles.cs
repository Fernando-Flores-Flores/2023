using AutoMapper;
using BackEnd2023.dtos;
using BackEnd2023.dtos.dto_Inventarios;
using BackEnd2023.Entidades;
using BackEnd2023.Entidades.bd.Inventarios;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace BackEnd2023.Utilitarios
{
    public class AutoMapperProfiles:Profile
    {
        public AutoMapperProfiles()
        {
     

            CreateMap<IdentityUser, usuarioDTO>();
            CreateMap<Claim, roles>();
            CreateMap<inventario, dto_Inventario>();
            CreateMap<ordenTrabajo, OrdenTrabajoDTO>();

        }
    }
}
