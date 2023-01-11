using AutoMapper;
using BackEnd2023.dtos;
using BackEnd2023.Entidades;
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
        }
    }
}
