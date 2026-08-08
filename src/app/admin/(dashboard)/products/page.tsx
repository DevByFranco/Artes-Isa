import { prisma } from "@/lib/prisma";
import ProductCard from "./ProductCard";
import ProductForm from "./ProductForm"; // <-- Importamos tu nuevo formulario cliente

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Gestión de Productos</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Columna Izquierda: Formulario (Ahora usando el Componente) */}
        <div className="md:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
          <h3 className="text-xl font-semibold mb-4 text-[#8A9A86]">Añadir Nuevo Producto</h3>
          
          {/* Aquí llamamos al formulario que creamos en el otro archivo */}
          <ProductForm />
          
        </div>

        {/* Columna Derecha: Lista con el componente ProductCard */}
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
          <h3 className="text-xl font-semibold mb-4 text-[#8A9A86]">Catálogo Actual</h3>
          
          {products.length === 0 ? (
            <div className="text-center text-gray-500 py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              Aún no hay productos registrados. Llena el formulario para añadir el primero.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}