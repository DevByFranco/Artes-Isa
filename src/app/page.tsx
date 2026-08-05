import { prisma } from "@/lib/prisma";
import PublicProductCard from "@/components/PublicProductCard";
import Link from "next/link";

export default async function HomePage() {
  // Consultamos todos los productos a la base de datos, ordenados por los más recientes
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-[#FDFBF7]">
      
      {/* 1. SECCIÓN HERO (Banner principal) */}
      <section className="bg-[#8A9A86]/10 py-16 sm:py-24 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-800 mb-6 tracking-tight">
            Estilo y elegancia en <br className="hidden sm:block" /> cada detalle
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl">
            Descubre nuestra colección exclusiva de bolsos, monederos y accesorios. Diseños únicos hechos para ti.
          </p>
          <Link 
            href="#catalogo" 
            className="bg-[#C6A664] hover:bg-[#b09255] text-white px-8 py-3 rounded-full font-medium transition-colors shadow-sm"
          >
            Ver Catálogo
          </Link>
        </div>
      </section>

      {/* 2. SECCIÓN COMPRAR POR CATEGORÍAS */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Comprar por Categorías</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <Link href="/categoria/Bolsos" className="group relative h-48 sm:h-64 rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10" />
            <span className="relative z-20 text-white font-bold text-xl tracking-wide">Bolsos</span>
          </Link>

          <Link href="/categoria/Bolsas de mano" className="group relative h-48 sm:h-64 rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10" />
            <span className="relative z-20 text-white font-bold text-xl tracking-wide text-center px-2">Bolsas de mano</span>
          </Link>

          <Link href="/categoria/Monederos" className="group relative h-48 sm:h-64 rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10" />
            <span className="relative z-20 text-white font-bold text-xl tracking-wide">Monederos</span>
          </Link>

          <Link href="/categoria/Correas" className="group relative h-48 sm:h-64 rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10" />
            <span className="relative z-20 text-white font-bold text-xl tracking-wide">Correas</span>
          </Link>
        </div>
      </section>

      {/* 3. SECCIÓN DEL CATÁLOGO (Usando tu PublicProductCard) */}
      <section id="catalogo" className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex justify-between items-end mb-10 border-b border-gray-100 pb-4">
          <h2 className="text-3xl font-semibold text-gray-800">Nuestro Catálogo</h2>
          <span className="text-gray-500 text-sm font-medium">{products.length} productos disponibles</span>
        </div>
        
        {products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-gray-500 text-lg">Aún no hay productos disponibles. ¡Vuelve pronto!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <PublicProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

    </main>
  );
}