export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import PublicProductCard from "@/components/PublicProductCard";
import Link from "next/link";

const subcategoriasBolsos = [
  "Bolsos de mano", 
  "Mano libre", 
  "Maletas", 
  "Morrales", 
  "Bandoleras"
];

interface Props {
  params: Promise<{
    nombre: string;
  }>;
  searchParams: Promise<{
    sub?: string;
  }>;
}

export default async function CategoriaPage({ params, searchParams }: Props) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
  const categoryName = decodeURIComponent(resolvedParams.nombre);
  const activeSubcategory = resolvedSearchParams.sub;

  const products = await prisma.product.findMany({
    where: {
      category: {
        equals: categoryName,
        mode: "insensitive", 
      },
      ...(activeSubcategory ? { subcategory: activeSubcategory } : {}),
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    /* FONDO PREDOMINANTE: Rosa claro (Dogwood) */
    <main className="min-h-screen bg-isa-soft-rosa-2 py-12">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Navegación para regresar al inicio */}
        <div className="mb-8">
          <Link href="/" className="text-white hover:text-isa-salmon transition-colors text-sm font-bold flex items-center gap-2">
            ← Volver al inicio
          </Link>
        </div>

        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-8 border-b border-white/100 pb-6">
          <div>
            <h1 className="text-4xl font-bold text-white capitalize mb-2">{categoryName}</h1>
            <p className="text-white">Explora nuestra selección exclusiva de {categoryName.toLowerCase()}.</p>
          </div>
          {/* DETALLE (Casi amarillo) */}
          <span className="text-white font-medium mt-4 md:mt-0 bg-isa-rosa-1 px-4 py-2 rounded-full shadow-sm">
            {products.length} {products.length === 1 ? 'producto' : 'productos'}
          </span>
        </div>

        {/* 4. BARRA DE SUBCATEGORÍAS */}
        {categoryName.toLowerCase() === "bolsos" && (
          <div className="flex overflow-x-auto hide-scrollbar gap-3 mb-10 pb-2 -mx-6 px-6 sm:mx-0 sm:px-0">
            <Link
              href={`/categoria/${resolvedParams.nombre}`}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-bold transition-colors border shadow-sm bg-isa-rosa-1 ${
                !activeSubcategory
                  ? "bg-isa-rosa-1 text-white border-isa-rosa-1" 
                  : "bg-isa-rosa-1 text-white border-isa-rosa-1 hover:border-isa-rosa-1 hover:bg-isa-rosa-1" // Inactivo: Secundario
              }`}
            >
              Ver todo
            </Link>

            {subcategoriasBolsos.map((sub) => {
              const isActive = activeSubcategory === sub;
              return (
                <Link
                  key={sub}
                  href={`/categoria/${resolvedParams.nombre}?sub=${encodeURIComponent(sub)}`}
                  className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-bold transition-colors border shadow-sm ${
                    isActive
                      ? "bg-isa-rosa-1 text-white border-isa-rosa-1"
                      : "bg-isa-almond/50 text-white border-isa-rosa-1 hover:border-isa-rosa-1 hover:bg-isa-rosa-1"
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
          /* SECUNDARIO: Fondo Almond para estado vacío */
          <div className="text-center py-24 bg-isa-almond/50 rounded-2xl border border-isa-almond shadow-sm flex flex-col items-center">
            <p className="text-white text-xl mb-4">Aún no hay productos en esta sección.</p>
            <Link href="/" className="bg-isa-rosa-1 text-white font-bold px-6 py-2 rounded-lg hover:bg-isa-rosa-1 shadow-sm transition-colors">
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