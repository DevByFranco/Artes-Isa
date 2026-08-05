import { createProduct } from "./actions";
import { prisma } from "@/lib/prisma";
import ProductCard from "./ProductCard";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Gestión de Productos</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Columna Izquierda: Formulario */}
        <div className="md:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
          <h3 className="text-xl font-semibold mb-4 text-[#8A9A86]">Añadir Nuevo Producto</h3>
          
          <form action={createProduct} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del producto</label>
              <input type="text" name="name" required className="w-full border border-gray-300 rounded-md p-2 focus:ring-[#C6A664] focus:border-[#C6A664] outline-none" placeholder="Ej. Bolso Tote Clásico" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
              <select name="category" required className="w-full border border-gray-300 rounded-md p-2 focus:ring-[#C6A664] focus:border-[#C6A664] outline-none bg-white">
                <option value="">Selecciona una categoría</option>
                <option value="Bolsos">Bolsos</option>
                <option value="Bolsas de mano">Bolsas de mano</option>
                <option value="Monederos">Monederos</option>
                <option value="Correas">Correas</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
              <textarea name="description" rows={3} className="w-full border border-gray-300 rounded-md p-2 focus:ring-[#C6A664] focus:border-[#C6A664] outline-none" placeholder="Detalles de cuero, medidas, etc."></textarea>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Precio ($)</label>
                <input type="number" name="price" required min="0" step="0.01" className="w-full border border-gray-300 rounded-md p-2 focus:ring-[#C6A664] focus:border-[#C6A664] outline-none" placeholder="0.00" />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                <input type="number" name="stock" required min="0" defaultValue="1" className="w-full border border-gray-300 rounded-md p-2 focus:ring-[#C6A664] focus:border-[#C6A664] outline-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Imagen del Producto</label>
              <input type="file" name="image" accept="image/*" required className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#8A9A86] file:text-white hover:file:bg-[#748371] cursor-pointer" />
            </div>

            <button type="submit" className="mt-4 w-full bg-[#C6A664] text-white py-2 px-4 rounded-md hover:bg-[#b09255] transition-colors font-medium shadow-sm">
              Guardar Producto
            </button>
          </form>
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