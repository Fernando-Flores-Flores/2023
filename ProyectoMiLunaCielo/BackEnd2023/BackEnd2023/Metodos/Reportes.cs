using BackEnd2023.Entidades.bd.Inventarios;
using iText.Kernel.Pdf;
using iText.Layout;
using iText.Layout.Element;
using iText.Layout.Properties;

namespace BackEnd2023.Metodos
{
    public class Reportes
    {
        public string generarReportePDF(string nombre)
        {
            List<inventario> listaPer = new List<inventario>();
            using (MemoryStream ms = new MemoryStream())
            {
                //Creamos el pdf
                PdfWriter writer = new PdfWriter(ms);
                //Luego creamos un PDF
                using (PdfDocument pdfDoc = new PdfDocument(writer))
                {
                    Document doc = new Document(pdfDoc);
                    crearParafoInicial(doc, "Reporte Inventarios", 20,"center");
                    Paragraph c1 = new Paragraph("Reporte Inventarios");
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


        public static void crearParafoInicial(Document doc, string titulo,int fontSize,string alineacion)
        {
            Paragraph c1 = new Paragraph(titulo);
            //Estilos de Itext7
            c1.SetFontSize(fontSize);
            switch (alineacion)
            {
                case "center":c1.SetTextAlignment(TextAlignment.CENTER); break;
                case "left":c1.SetTextAlignment(TextAlignment.LEFT); break;
                case "right": c1.SetTextAlignment(TextAlignment.RIGHT); break;
                default: c1.SetTextAlignment(TextAlignment.CENTER); break;
            }
            doc.Add(c1);
        }
    }
}
