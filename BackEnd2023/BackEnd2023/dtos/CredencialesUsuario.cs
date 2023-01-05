using System.ComponentModel.DataAnnotations;

namespace BackEnd2023.dtos
{
    public class CredencialesUsuario
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        
        [Required]
        public string password { get; set; }
    }
}
