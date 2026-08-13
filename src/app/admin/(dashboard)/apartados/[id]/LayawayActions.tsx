"use client";

import { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { addPaymentAction } from "@/actions/apartadosActions";
import { LogoArtesIsaBase64 } from "@/utils/images"; 

type Payment = {
  id: string;
  amount: number;
  method: string;
  createdAt: Date;
};

type Props = {
  layaway: {
    id: string;
    totalPrice: number;
    customer: { name: string; phone: string };
    product: { name: string };
    payments: Payment[];
  };
  remaining: number;
};

export default function LayawayActions({ layaway, remaining }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  // Generador del Recibo en PDF Profesional
  const generatePDF = () => {
    const doc = new jsPDF();
    const primaryColor: [number, number, number] = [226, 156, 156]; 

    // --- 1. ENCABEZADO CON BLOQUE DE COLOR Y DATOS DE LA EMPRESA ---
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 0, 210, 42, 'F'); // Fondo de borde a borde

    // Nombre de la marca
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("ARTES ISA", 14, 18); 
    
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text("Comprobante de Apartado", 14, 25);

    // Información de contacto comercial
    doc.setFontSize(8.5);
    doc.setTextColor(240, 240, 240);
    doc.text("NIT: 123456789-0", 14, 32);
    doc.text("WhatsApp: +57 312 273 7377  |  Instagram: marroquineria_artes_isa", 14, 37);

    // Logo
    doc.addImage(LogoArtesIsaBase64, 'PNG', 165, 7, 28, 28); 

    // --- 2. DATOS DE IDENTIFICACIÓN ---
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(9.5);
    doc.setFont("helvetica", "bold");
    doc.text(`N° RECIBO: #${layaway.id.substring(0, 8).toUpperCase()}`, 14, 50);
    
    doc.setFont("helvetica", "normal");
    doc.text(`Fecha de Emisión: ${new Date().toLocaleDateString()}`, 196, 50, { align: "right" });

    // --- 3. DATOS DEL CLIENTE Y PRODUCTO (Tarjeta Informativa) ---
    doc.setFillColor(249, 250, 251); 
    doc.setDrawColor(229, 231, 235); 
    doc.roundedRect(14, 56, 182, 32, 3, 3, 'FD'); 

    doc.setTextColor(40, 40, 40);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("DATOS DEL CLIENTE", 18, 64);
    doc.text("DETALLE DEL PRODUCTO", 105, 64);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(70, 70, 70);
    doc.text(`Nombre: ${layaway.customer.name}`, 18, 72);
    doc.text(`Teléfono: ${layaway.customer.phone}`, 18, 79);

    doc.text(`Producto: ${layaway.product.name}`, 105, 72);
    doc.text(`Valor Total: $${layaway.totalPrice.toLocaleString()}`, 105, 79);

    // --- 4. TABLA DE ABONOS ---
    const tableData = layaway.payments.map((p, index) => [
      `#${layaway.payments.length - index}`,
      new Date(p.createdAt).toLocaleDateString(),
      p.method,
      `$${p.amount.toLocaleString()}`
    ]);

    autoTable(doc, {
      startY: 96,
      head: [["# Abono", "Fecha de Pago", "Método de Pago", "Monto Abonado"]],
      body: tableData,
      theme: 'grid', 
      headStyles: { fillColor: primaryColor, textColor: 255, fontStyle: 'bold' },
      styles: { fontSize: 9.5, cellPadding: 5.5, textColor: [50, 50, 50] },
      alternateRowStyles: { fillColor: [250, 250, 250] },
    });

    // --- 5. TARJETA DE RESUMEN DE TOTALES ---
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const finalY = (doc as any).lastAutoTable?.finalY ? (doc as any).lastAutoTable.finalY + 12 : 115;
    const totalPaid = layaway.payments.reduce((sum, p) => sum + p.amount, 0);

    // Fondo estructurado para la tarjeta de totales (lado derecho)
    const boxWidth = 90;
    const boxX = 106;
    const boxHeight = 36;

    doc.setFillColor(249, 250, 251);
    doc.setDrawColor(229, 231, 235);
    doc.roundedRect(boxX, finalY, boxWidth, boxHeight, 3, 3, 'FD');

    const rightMargin = boxX + boxWidth - 6; 
    const labelX = boxX + 6; 

    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.setFont("helvetica", "normal");
    
    doc.text("Total Producto:", labelX, finalY + 9);
    doc.text(`$${layaway.totalPrice.toLocaleString()}`, rightMargin, finalY + 9, { align: "right" });
    
    doc.text("Total Abonado:", labelX, finalY + 17);
    doc.text(`$${totalPaid.toLocaleString()}`, rightMargin, finalY + 17, { align: "right" });

    // Línea divisoria interna
    doc.setDrawColor(220, 220, 220);
    doc.line(labelX, finalY + 22, rightMargin, finalY + 22);
    
    // ESTADO FINAL
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    if (remaining <= 0) {
      // AQUÍ SE CAMBIÓ EL COLOR DE VERDE A ROSA (#E29C9C -> 226, 156, 156)
      doc.setTextColor(226, 156, 156); 
      doc.text("¡PAGADO EN TOTALIDAD!", labelX, finalY + 30);
    } else {
      doc.setTextColor(239, 68, 68); // Rojo
      doc.text("Saldo Pendiente:", labelX, finalY + 30);
      doc.text(`$${remaining.toLocaleString()}`, rightMargin, finalY + 30, { align: "right" });
    }

    // --- 6. POLÍTICAS Y CONDICIONES ---
    const termsY = finalY + boxHeight + 15;
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(100, 100, 100);
    doc.text("POLÍTICAS Y CONDICIONES DEL APARTADO:", 14, termsY);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(130, 130, 130);
    doc.text("• Los artículos apartados tienen una vigencia máxima de 30 días para ser liquidados.", 14, termsY + 5);
    doc.text("• No se realizan devoluciones en dinero sobre los abonos efectuados en caso de cancelación.", 14, termsY + 10);
    doc.text("• Conserve este comprobante digital o impreso como soporte para la entrega de su producto.", 14, termsY + 15);

    // --- 7. PIE DE PÁGINA ---
    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.setFont("helvetica", "italic");
    doc.text("¡Gracias por tu compra y confianza en Artes Isa!", 105, 280, { align: "center" });

    // Descargar el archivo
    doc.save(`Apartado_${layaway.customer.name.replace(/\s+/g, "_")}.pdf`);
  };

  return (
    <>
      <div className="flex gap-3 w-full sm:w-auto">
        {/* Botón Descargar PDF */}
        <button
          onClick={generatePDF}
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-lg font-medium transition-colors border border-gray-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Descargar PDF
        </button>

        {/* Botón Nuevo Abono */}
        {remaining > 0 && (
          <button
            onClick={() => setIsOpen(true)}
            className="flex-1 sm:flex-none bg-isa-rosa-1 hover:bg-isa-rosa-1 text-white px-4 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
          >
            + Nuevo Abono
          </button>
        )}
      </div>

      {/* MODAL / POPUP DE NUEVO ABONO */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-lg font-bold text-gray-800">Registrar Nuevo Abono</h3>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600 font-bold">✕</button>
            </div>

            <form
              action={async (formData) => {
                await addPaymentAction(formData);
                setIsOpen(false);
              }}
              className="space-y-4"
            >
              <input type="hidden" name="layawayId" value={layaway.id} />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Monto a Abonar (Máximo ${remaining})
                </label>
                <input
                  type="number"
                  name="amount"
                  required
                  min="1"
                  max={remaining}
                  placeholder={`Ej. ${remaining}`}
                  className="w-full p-2.5 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#8A9A86]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Método de Pago</label>
                <select name="paymentMethod" required className="w-full p-2.5 border border-gray-200 rounded-lg outline-none bg-white">
                  <option value="EFECTIVO">Efectivo</option>
                  <option value="TRANSFERENCIA">Transferencia Bancaria</option>
                  <option value="NEQUI">Nequi / Daviplata</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#8A9A86] hover:bg-[#748371] text-white rounded-lg font-bold"
                >
                  Guardar Abono
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}