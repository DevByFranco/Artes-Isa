import { prisma } from "@/lib/prisma";
import PublicProductCard from "@/components/PublicProductCard";
import Image from "next/image";

export default async function HomePage() {
  // Consultamos todos los productos a la base de datos, ordenados por los más recientes
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-[#FDFBF7]">
      
      {/* Sección Encabezado (Hero) */}
      <header className="bg-white border-b border-gray-100 py-16 text-center shadow-sm">
        <div className="max-w-4xl mx-auto px-4 flex flex-col items-center">
          <Image 
            src="/logo.png" 
            alt="Logo Artes Isa" 
            width={80} 
            height={80} 
            className="mb-6 rounded-xl shadow-sm"
          />
          <h1 className="text-4xl md:text-5xl font-bold text-[#8A9A86] mb-4">
            Bienvenido a Artes Isa
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Descubre nuestra colección exclusiva de bolsos, monederos y accesorios. Diseños únicos hechos para ti.
          </p>
        </div>
      </header>

      {/* Sección del Catálogo */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex justify-between items-end mb-10">
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