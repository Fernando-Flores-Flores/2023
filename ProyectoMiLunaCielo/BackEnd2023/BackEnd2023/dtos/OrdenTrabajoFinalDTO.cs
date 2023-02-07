using BackEnd2023.Entidades;

namespace BackEnd2023.dtos
{
    public class OrdenTrabajoFinalDTO<T>
    {
        public int? statusCode { get; set; }
        public int? IdConsulta { get; set; } = new Random().Next();
        public int? codigoRespuesta { get; set; }
        public string? MensajeRespuesta { get; set; }
        public DateTime? fechaConsulta { get; set; } = DateTime.Now;
        public T? datos { get; set; }
        public IList<ordenTrabajo>? listaOrdenes { get; set; }
        public IList<persona>? listaClientes { get; set; }
        public IList<persona>? listaPersonalAsignado { get; set; }




    }
}
