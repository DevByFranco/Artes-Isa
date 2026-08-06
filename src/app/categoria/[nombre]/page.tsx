export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import PublicProductCard from "@/components/PublicProductCard";
import Link from "next/link";

// 1. Actualizamos esto para avisarle a TypeScript que es una Promesa
interface Props {
  params: Promise<{
    nombre: string;
  }>;
}

export default async function CategoriaPage({ params }: Props) {
  // 2. AQUÍ ESTÁ LA MAGIA: Esperamos a que la URL se termine de leer
  const resolvedParams = await params;
  const categoryName = decodeURIComponent(resolvedParams.nombre);

  // 3. Buscamos los productos de forma insensible a mayúsculas/minúsculas
  const products = await prisma.product.findMany({
    where: {
      category: {
        equals: categoryName,
        mode: "insensitive", 
      }
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-[#FDFBF7] py-12">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Navegación para regresar al inicio */}
        <div className="mb-8">
          <Link href="/" className="text-[#8A9A86] hover:text-gray-800 transition-colors text-sm font-medium flex items-center gap-2">
            ← Volver al inicio
          </Link>
        </div>

        {/* Encabezado de la categoría */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-10 border-b border-gray-200 pb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 capitalize mb-2">{categoryName}</h1>
            <p className="text-gray-600">Explora nuestra selección exclusiva de {categoryName.toLowerCase()}.</p>
          </div>
          <span className="text-gray-500 font-medium mt-4 md:mt-0 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
            {products.length} {products.length === 1 ? 'producto' : 'productos'}
          </span>
        </div>
        
        {/* Grilla de productos filtrados */}
        {products.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center">
            <p className="text-gray-500 text-xl mb-4">Aún no hay productos en la categoría &quot;{categoryName}&quot;.</p>
            <Link href="/" className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">
              Ver todo el catálogo
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <PublicProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </main>
  );
}