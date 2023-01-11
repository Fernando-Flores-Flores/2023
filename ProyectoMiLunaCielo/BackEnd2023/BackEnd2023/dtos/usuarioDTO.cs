using BackEnd2023.Entidades;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace BackEnd2023.dtos
{
    public class usuarioDTO
    {
        public string Id { get; set; }
        public string Email { get; set; }

        public IList<roles> Claims{get; set;  }
    }
}