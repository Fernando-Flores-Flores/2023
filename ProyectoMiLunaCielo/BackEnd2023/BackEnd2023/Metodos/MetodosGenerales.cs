using Microsoft.EntityFrameworkCore;

namespace BackEnd2023.Metodos
{
    public class MetodosGenerales
    {
        private readonly ApplicationDbContext context;
        public MetodosGenerales(ApplicationDbContext context)
        { 
            this.context = context;
        }
        public async Task<bool> ExisteCodigoEnBD(string codigo)
        {
            var res = await context.bd_Inventario.AnyAsync(p => p.codigo == codigo);
            if (res)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
