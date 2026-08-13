export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma"; 
import Link from "next/link";

export default async function ApartadosPage() {
  const layaways = await prisma.layaway.findMany({
    include: {
      customer: true,
      product: true,
      payments: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Sistema de Apartados</h1>
          <p className="text-sm text-gray-500 mt-1">
            Gestiona los productos separados por tus clientes.
          </p>
        </div>
        <Link
          href="/admin/apartados/nuevo"
          className="bg-isa-rosa-1 hover:bg-isa-soft-rosa-2 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm w-full sm:w-auto text-center"
        >
          + Nuevo Apartado
        </Link>
      </div>

      {/* Tabla de Apartados */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {layaways.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-lg font-medium text-gray-700">No hay apartados activos</p>
            <p className="text-sm mt-1">Crea tu primer apartado para empezar a llevar el control.</p>
          </div>
        ) : (
          <div className="overflow-x-auto pb-2">
            {/* AQUÍ ESTÁ LA MAGIA: min-w-[800px] evita que la tabla se aplaste */}
            <table className="w-full min-w-200 text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-600 text-sm border-b border-gray-100">
                  <th className="p-4 font-medium">Cliente</th>
                  <th className="p-4 font-medium">Producto</th>
                  <th className="p-4 font-medium">Estado</th>
                  <th className="p-4 font-medium">Total</th>
                  <th className="p-4 font-medium">Abonado</th>
                  <th className="p-4 font-medium">Restante</th>
                  <th className="p-4 font-medium text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {layaways.map((layaway) => {
                  const totalPaid = layaway.payments.reduce((sum, payment) => sum + payment.amount, 0);
                  const remaining = layaway.totalPrice - totalPaid;

                  return (
                    <tr key={layaway.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <div className="font-medium text-gray-800">{layaway.customer.name}</div>
                        <div className="text-xs text-gray-500">{layaway.customer.phone}</div>
                      </td>
                      <td className="p-4 text-gray-700">{layaway.product.name}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          layaway.status === "ACTIVE" ? "bg-blue-50 text-blue-600" :
                          layaway.status === "PAID" ? "bg-green-50 text-green-600" :
                          "bg-red-50 text-red-600"
                        }`}>
                          {layaway.status === "ACTIVE" ? "Activo" : layaway.status === "PAID" ? "Pagado" : "Cancelado"}
                        </span>
                      </td>
                      <td className="p-4 font-medium text-gray-800">${layaway.totalPrice}</td>
                      <td className="p-4 text-green-600 font-medium">${totalPaid}</td>
                      <td className="p-4 text-red-500 font-medium">${remaining > 0 ? remaining : 0}</td>
                      <td className="p-4 text-right">
                        <Link 
                          href={`/admin/apartados/${layaway.id}`}
                          className="text-isa-rosa-1 hover:text-isa-dark font-medium transition-colors whitespace-nowrap"
                        >
                          Ver detalles
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}