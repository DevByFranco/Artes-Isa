import { prisma } from "@/lib/prisma";
import NewLayawayForm from "./NewLayawayForm";
import Link from "next/link";

export default async function NuevoApartadoPage() {
  // Traemos solo los productos que tengan stock disponible
  const products = await prisma.product.findMany({
    where: { stock: { gt: 0 } },
    select: { id: true, name: true, price: true },
    orderBy: { name: 'asc' }
  });

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/apartados" className="text-gray-400 hover:text-gray-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Nuevo Apartado</h1>
          <p className="text-sm text-gray-500">Registra el cliente, el producto y su pago inicial.</p>
        </div>
      </div>

      <NewLayawayForm products={products} />
    </div>
  );
}