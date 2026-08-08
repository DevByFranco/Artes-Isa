export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import PublicProductCard from "@/components/PublicProductCard";
import Link from "next/link";

// Definimos las subcategorías exclusivas de "Bolsos"
const subcategoriasBolsos = [
  "Bolsos de mano", 
  "Mano libre", 
  "Maletas", 
  "Morrales", 
  "Bandoleras"
];

// 1. Actualizamos la interfaz para recibir también los searchParams (los parámetros de la URL como ?sub=Maletas)
interface Props {
  params: Promise<{
    nombre: string;
  }>;
  searchParams: Promise<{
    sub?: string;
  }>;
}

export default async function CategoriaPage({ params, searchParams }: Props) {
  // 2. Esperamos a que ambos parámetros se terminen de leer
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
  const categoryName = decodeURIComponent(resolvedParams.nombre);
  
  // Obtenemos la subcategoría seleccionada de la URL (si el usuario hizo clic en alguna)
  const activeSubcategory = resolvedSearchParams.sub;

  // 3. Buscamos los productos, añadiendo dinámicamente el filtro de subcategoría si existe
  const products = await prisma.product.findMany({
    where: {
      category: {
        equals: categoryName,
        mode: "insensitive", 
      },
      // Si activeSubcategory tiene valor, agrega esto al filtro de Prisma
      ...(activeSubcategory ? { subcategory: activeSubcategory } : {}),
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
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-8 border-b border-gray-200 pb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 capitalize mb-2">{categoryName}</h1>
            <p className="text-gray-600">Explora nuestra selección exclusiva de {categoryName.toLowerCase()}.</p>
          </div>
          <span className="text-gray-500 font-medium mt-4 md:mt-0 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
            {products.length} {products.length === 1 ? 'producto' : 'productos'}
          </span>
        </div>

        {/* 4. BARRA DE SUBCATEGORÍAS (Solo visible si la categoría es Bolsos) */}
        {categoryName.toLowerCase() === "bolsos" && (
          <div className="flex overflow-x-auto hide-scrollbar gap-3 mb-10 pb-2 -mx-6 px-6 sm:mx-0 sm:px-0">
            {/* Botón para quitar el filtro (Ver todo) */}
            <Link
              href={`/categoria/${resolvedParams.nombre}`}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-colors border ${
                !activeSubcategory
                  ? "bg-[#8A9A86] text-white border-[#8A9A86] shadow-sm"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#8A9A86] hover:text-[#8A9A86]"
              }`}
            >
              Ver todo
            </Link>

            {/* Generamos un botón por cada subcategoría */}
            {subcategoriasBolsos.map((sub) => {
              const isActive = activeSubcategory === sub;
              return (
                <Link
                  key={sub}
                  // El link le añade a la URL actual el parámetro ?sub=NombreDeLaSubcategoria
                  href={`/categoria/${resolvedParams.nombre}?sub=${encodeURIComponent(sub)}`}
                  className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-colors border ${
                    isActive
                      ? "bg-[#8A9A86] text-white border-[#8A9A86] shadow-sm"
                      : "bg-white text-gray-600 border-gray-200 hover:border-[#8A9A86] hover:text-[#8A9A86]"
                  }`}
                >
                  {sub}
                </Link>
              );
            })}
          </div>
        )}
        
        {/* Grilla de productos filtrados */}
        {products.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center">
            <p className="text-gray-500 text-xl mb-4">Aún no hay productos en esta sección.</p>
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