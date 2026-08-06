import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import LayawayActions from "./LayawayActions";

// 1. Le decimos a TypeScript que params ahora es una "Promesa" (Promise)
export default async function DetalleApartadoPage({ params }: { params: Promise<{ id: string }> }) {
  
  // 2. Esperamos (await) a que Next.js extraiga el ID de la URL
  const { id } = await params;

  // 3. Ahora sí, buscamos el apartado con el ID correcto
  const layaway = await prisma.layaway.findUnique({
    where: { id: id },
    include: {
      customer: true,
      product: true,
      payments: {
        orderBy: { createdAt: 'desc' } 
      }
    }
  });

  if (!layaway) {
    notFound();
  }

  const totalPaid = layaway.payments.reduce((sum, payment) => sum + payment.amount, 0);
  const remaining = layaway.totalPrice - totalPaid;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Encabezado y Botones de Acción */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-4">
          <Link href="/admin/apartados" className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Detalles del Apartado</h1>
            <p className="text-sm text-gray-500 font-mono mt-1">ID: {layaway.id}</p>
          </div>
        </div>
        
        {/* Aquí llamamos a nuestro componente interactivo con el Modal y el PDF */}
        <LayawayActions layaway={layaway} remaining={remaining} />
      </div>

      {/* Contenido Principal a dos columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Columna Izquierda */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Información del Cliente</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Nombre</p>
                <p className="font-medium text-gray-800 text-lg">{layaway.customer.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Teléfono</p>
                <p className="font-medium text-gray-800 text-lg">{layaway.customer.phone}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Producto Apartado</h2>
            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <p className="font-medium text-gray-800 text-lg">{layaway.product.name}</p>
                <p className="text-sm text-gray-500 mt-1">Precio Original: ${layaway.product.price}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 mb-1">Estado</p>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  layaway.status === "ACTIVE" ? "bg-blue-100 text-blue-700" :
                  layaway.status === "PAID" ? "bg-green-100 text-green-700" :
                  "bg-red-100 text-red-700"
                }`}>
                  {layaway.status === "ACTIVE" ? "Activo" : layaway.status === "PAID" ? "Pagado" : "Cancelado"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Columna Derecha */}
        <div className="space-y-6">
          
          <div className="bg-[#8A9A86]/10 p-6 rounded-xl border border-[#8A9A86]/20">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Resumen de Cuenta</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Total a pagar:</span>
                <span className="font-medium">${layaway.totalPrice}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Total abonado:</span>
                <span className="font-medium">${totalPaid}</span>
              </div>
              <div className="pt-3 border-t border-[#8A9A86]/20 flex justify-between text-gray-900">
                <span className="font-bold">Saldo Pendiente:</span>
                <span className="font-bold text-xl text-red-600">${remaining > 0 ? remaining : 0}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Historial de Abonos</h2>
            <ul className="space-y-4">
              {layaway.payments.map((payment, index) => (
                <li key={payment.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <div>
                    <p className="font-medium text-gray-800">${payment.amount}</p>
                    <p className="text-xs text-gray-500 flex gap-2">
                      <span>{new Date(payment.createdAt).toLocaleDateString()}</span>
                      <span className="font-semibold text-gray-400">•</span>
                      <span className="uppercase text-gray-600">{payment.method}</span>
                    </p>
                  </div>
                  <div className="text-xs font-bold text-gray-400">
                    #{layaway.payments.length - index}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}