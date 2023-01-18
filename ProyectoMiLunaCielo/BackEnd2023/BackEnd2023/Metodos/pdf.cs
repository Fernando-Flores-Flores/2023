using c = iText.Kernel.Colors;
using iText.Kernel.Pdf;
using iText.Layout;
using iText.Layout.Element;
using iText.Layout.Properties;
using iText.Layout.Borders;
using iText.IO.Image;

namespace BackEnd2023.Metodos
{
    public class pdf
    {
        //doc=Docuemnto
        //anchosde la tabla
        //elemento que sera una imagen y un texto
        //anchosAlto de la imagen
        //tamaño de la fuente 
        //margen de la tabla
        public static void crearFila(Document doc, List<float> anchosTabla, List<object> elemento
            ,List<(float,float)> anchosAltos, int tamanoFuente=12,int marginBotonTabla=10)
        {
            Table otable;
            otable = new Table(UnitValue.CreatePercentArray(anchosTabla.ToArray()));
            otable.SetWidth(UnitValue.CreatePercentValue(100));
            otable.SetMarginBottom(marginBotonTabla);
            int i = 0;
            //string
            //bytes
            foreach (object el in elemento)
            {
                Cell ocell= new Cell();
                if (el.GetType().Name=="String")
                {
                    Paragraph pParagraph = new Paragraph(el.ToString());
                    pParagraph.SetFontSize(tamanoFuente);
                    ocell.Add(pParagraph);
                }
                else
                {
                    Image oimage = new Image(ImageDataFactory.Create((byte[])el));
                    if(anchosAltos == null)
                    {
                        oimage.SetWidth(50);
                        oimage.SetHeight(50);

                    }
                    else
                    {
                        oimage.SetWidth(anchosAltos[i].Item1);
                        oimage.SetWidth(anchosAltos[i].Item2);
                        i++;
                    }
                    ocell.Add(oimage);
                }
                ocell.SetBorder(Border.NO_BORDER);
                otable.AddCell(ocell);
            }
            doc.Add(otable);

        }
        public static void crearParrafoInicial(Document doc, string titulo, int fontSize, string alineacion)
        {
            Paragraph c1 = new Paragraph(titulo);
            //Estilos de Itext7
            c1.SetFontSize(fontSize);
            alineacionTexto(c1,alineacion);
   
            doc.Add(c1);
        }


        public static void alineacionTexto(Paragraph c1,string alineacion)
        {
            switch (alineacion)
            {
                case "center": c1.SetTextAlignment(TextAlignment.CENTER); break;
                case "left": c1.SetTextAlignment(TextAlignment.LEFT); break;
                case "right": c1.SetTextAlignment(TextAlignment.RIGHT); break;
                default: c1.SetTextAlignment(TextAlignment.CENTER); break;
            }
        }
        public static void crearTabla<T>(Document doc, List<string> cabeceras, List<T> data, List<string> campos)
        {
            Table otable = new Table(cabeceras.Count);
            otable.SetWidth(UnitValue.CreatePercentValue(100));
            Cell ocell;
            foreach (string cabe in cabeceras)
            {
                ocell = new Cell();
                ocell.SetBackgroundColor(c.ColorConstants.ORANGE);
                ocell.Add(new Paragraph(cabe));
                otable.AddCell(ocell);

            }
            for (int j = 0; j < data.Count; j++)
            {
                for (int i = 0; i < campos.Count; i++)
                {
                    ocell = new Cell();
                    ocell.Add(new Paragraph(data[j].GetType().GetProperty(campos[i]).GetValue(data[j], null) == null ? "" :
                        data[j].GetType().GetProperty(campos[i]).GetValue(data[j], null).ToString()));
                    otable.AddCell(ocell);
                }
            }
            doc.Add(otable);
            /*
            //Columna cantidad
            ocell = new Cell();
            ocell.Add(new Paragraph(data[j].cantidad.ToString()));
            otable.AddCell(ocell);

            //Columna codigo
            ocell = new Cell();
            ocell.Add(new Paragraph(data[j].codigo));
            otable.AddCell(ocell);

            //Columna oficina
            ocell = new Cell();
            ocell.Add(new Paragraph(data[j].oficina));
            otable.AddCell(ocell);

            //Columna descripcion
            ocell = new Cell();
            ocell.Add(new Paragraph(data[j].descripcion));
            otable.AddCell(ocell);

            //Columna observaciones
            ocell = new Cell();
            ocell.Add(new Paragraph(data[j].observaciones));
            otable.AddCell(ocell);

            //Columna area
            ocell = new Cell();
            ocell.Add(new Paragraph(data[j].area));
            otable.AddCell(ocell);
        }
        doc.Add(otable);
        */
        }

        public string verificarTitulo(string tipoFormulario) { 
        switch(tipoFormulario)
            {
                case "1":return "INVENTARIO DE MUEBLES Y ENSERES"; break;
                case "2": return "INVENTARIO DE MAQUINARIA"; break;
                case "3": return "INVENTARIO DE EQUIPOS DE COMPUTACIÓN"; break;
                case "4": return "INVENTARIO DE MATERIAL DE ESCRITORIO"; break;
                case "5": return "INVENTARIO DE ACTIVOS FIJOS"; break;
                default: return "REPORTE INVENTARIO"; break;
            }
        }
    
    }
}
