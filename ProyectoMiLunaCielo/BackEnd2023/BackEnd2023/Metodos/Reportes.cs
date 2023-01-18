using c = iText.Kernel.Colors;
using iText.Kernel.Pdf;
using iText.Layout;
using iText.Layout.Element;
using iText.Layout.Properties;
using BackEnd2023.dtos;
using io = System.IO;
using BackEnd2023.dtos.dto_Inventarios;
namespace BackEnd2023.Metodos
{
    public class Reportes
    {
 
        public string generarReportePDF(string tipoFormuario,string titulo)
        {
            List<dto_Inventario> listaPer = listaInventario(tipoFormuario);
            List<string> cabecera = new List<string>
            {
                "Cantidad","Código","Oficina","Equipo","Observaciones","Area"
            };
            using (MemoryStream ms = new MemoryStream())
            {
                //Creamos el pdf
                PdfWriter writer = new PdfWriter(ms);
                //Luego creamos un PDF
                using (PdfDocument pdfDoc = new PdfDocument(writer))
                {
                    Document doc = new Document(pdfDoc);
                    // pdf.crearParrafoInicial(doc, "Reporte Inventarios", 20, "center");

                    //string rutaImage = Path.Combine(env.ContentRootPath, "assets/Xamarin.jpeg");
                    string rutaImage = Path.Combine(Directory.GetCurrentDirectory(), "assets/Xamarin.jpeg");
                    byte[] buffer = io.File.ReadAllBytes(rutaImage);


                    //doc=Docuemnto
                    //anchosde la tabla
                    //elemento que sera una imagen y un texto
                    //anchosAlto de la imagen
                    //tamaño de la fuente 
                    //margen de la tabla
                    pdf.crearFila(doc, new List<float> { 45, 55 }, new List<object> { buffer, titulo }, new List<(float, float)> { (200, 150) }, 20, 10);



                    pdf.crearTabla(doc, cabecera, listaPer, new List<string>
                    {
                        "cantidad" ,  "codigo", "oficina","descripcion","observaciones","area"
                    });



                    //Paragraph c1 = new Paragraph("Reporte Inventarios");
                    //Estilos de Itext7
                    //c1.SetFontSize(20);
                    //c1.SetTextAlignment(TextAlignment.CENTER);

                    //doc.Add(c1);
                    // Se cierra el documento
                    doc.Close();
                    //Se cierra la escritura
                    writer.Close();
                }
                return Convert.ToBase64String(ms.ToArray());

            }
        }


  

        public List<dto_Inventario> listaInventario(string codigo=null)
        {
             ApplicationDbContext context = new ApplicationDbContext();
            if (codigo != null)
                return (from t in context.bd_Inventario
                        where t.IdtipoInventario == codigo
                        select new dto_Inventario
                        {
                            IdtipoInventario = t.IdtipoInventario,
                            codigo = t.codigo,
                            cantidad = t.cantidad,
                            oficina = t.oficina,
                            descripcion = t.descripcion,
                            observaciones = t.observaciones,
                            area = t.area,
                            fechaCreacion = t.fechaCreacion,
                            fechaModificacion = t.fechaModificacion,
                            estado = t.estado
                        }).ToList();
            else
                return (from t in context.bd_Inventario
                        select new dto_Inventario
                        {
                            IdtipoInventario = t.IdtipoInventario,
                            codigo = t.codigo,
                            cantidad = t.cantidad,
                            oficina = t.oficina,
                            descripcion = t.descripcion,
                            observaciones = t.observaciones,
                            area = t.area,
                            fechaCreacion = t.fechaCreacion,
                            fechaModificacion = t.fechaModificacion,
                            estado = t.estado
                        }).ToList();
        }

    }
}
