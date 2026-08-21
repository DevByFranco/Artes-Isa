export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import PublicProductCard from "@/components/PublicProductCard";
import Link from "next/link";
import Image from "next/image"; 

const categoriesData = [
  { id: "1", name: "Bolsos", href: "/categoria/Bolsos", image: "/categories/bolso(ejemplo).jpg" },
  { id: "2", name: "Monederos", href: "/categoria/Monederos", image: "/categories/monedero(ejemplo).jpg" },
  { id: "3", name: "Correas", href: "/categoria/Correas", image: "/categories/correas(ejemplo).jpg" },
  { id: "4", name: "Carteras", href: "/categoria/Carteras", image: "/categories/bolsomano(ejemplo).jpg" },
];

export default async function HomePage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    /* FONDO PREDOMINANTE: Rosa claro (Dogwood) */
    <main className="min-h-screen bg-isa-almond-3">
      
      {/* 1. SECCIÓN HERO (Banner principal) - Rosa fuerte (Salmon) para dar impacto */}
      <section className="bg-isa-rosa-1 py-16 sm:py-24 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 tracking-tight drop-shadow-sm">
            Estilo y elegancia en <br className="hidden sm:block" /> cada detalle
          </h1>
          <p className="text-lg text-white/90 mb-8 max-w-2xl">
            Descubre nuestra colección exclusiva de bolsos, monederos y accesorios. Diseños únicos hechos para ti.
          </p>
          <Link 
            href="#catalogo" 
            /* DETALLE (Casi amarillo): Botón en Beige con texto oscuro */
            className="bg-isa-beige-4 hover:bg-[#e8e8c8] text-isa-rosa-1 px-8 py-3 rounded-full font-bold transition-colors shadow-md"
          >
            Ver Catálogo
          </Link>
        </div>
      </section>

      {/* 2. SECCIÓN COMPRAR POR CATEGORÍAS */}
      <section id="categorias" className="py-16 px-6 max-w-7xl mx-auto scroll-mt-24 bg-isa-almond-3">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Comprar por Categorías</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {categoriesData.map((cat) => (
            <Link 
              key={cat.id} 
              href={cat.href} 
              /* SECUNDARIO: Fondo Almond para las tarjetas antes de que cargue la imagen */
              className="group relative h-48 sm:h-64 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex items-center justify-center bg-isa-almond-3"
            >
              <Image
                src={cat.image}
                alt={`Categoría de ${cat.name}`}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out z-0"
              />
              
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300 z-10" />
              
              <span className="relative z-20 text-white font-bold text-xl tracking-wide text-center px-2 drop-shadow-md">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. SECCIÓN DEL CATÁLOGO */}
      <section id="catalogo" className="max-w-7xl mx-auto px-6 py-16 scroll-mt-24">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-4 mb-10 border-b border-white/100 pb-4">
          <h2 className="text-3xl font-semibold text-white">Nuestro Catálogo</h2>
          <span className="text-white text-sm font-medium">{products.length} productos disponibles</span>
        </div>
        
        {products.length === 0 ? (
          /* SECUNDARIO: Fondo Almond para alertas/mensajes secundarios */
          <div className="text-center py-20 bg-isa-almond-3/50 rounded-2xl border border-isa-almond-3 shadow-sm">
            <p className="text-gray-700 text-lg">Aún no hay productos disponibles. ¡Vuelve pronto!</p>
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