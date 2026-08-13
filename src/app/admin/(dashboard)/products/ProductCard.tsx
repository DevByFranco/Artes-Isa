"use client";

import { useState } from "react";
import Image from "next/image";
import { deleteProduct, updateProduct } from "./actions";

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
}

export default function ProductCard({ product }: { product: Product }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <div className="relative flex flex-col sm:flex-row gap-4 bg-isa-beige-4 border border-gray-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-all">
        
        {/* Imagen */}
        <div className="shrink-0 relative">
          {product.images[0] ? (
            <Image 
              src={product.images[0]} 
              alt={product.name} 
              width={96}
              height={96}
              className="w-24 h-24 object-cover rounded-lg border border-gray-100 shadow-sm" 
            />
          ) : (
            <div className="w-24 h-24 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-center text-xs text-gray-400">
              Sin imagen
            </div>
          )}
        </div>

        {/* Información del producto */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start pr-16">
              <span className="inline-block px-2 py-0.5 bg-isa-almond-3 text-isa-dark text-[10px] font-bold uppercase tracking-wider rounded-md mb-1">
                {product.category}
              </span>
            </div>
            
            <h4 className="font-semibold text-isa-rosa-1 text-base leading-tight pr-14">{product.name}</h4>
            
            {/* Descripción elegante siempre visible */}
            <p className="text-xs text-isa-dark line-clamp-2 mt-1.5 leading-relaxed italic bg-gray-50/60 p-1.5 rounded border border-gray-100/80">
              {product.description || "Sin descripción disponible."}
            </p>
          </div>
          
          <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-50">
            <p className="text-isa-rosa-1 font-bold text-base">${product.price}</p>
            <p className="text-xs text-gray-500 font-medium">Stock: <span className="text-isa-rosa-1 font-bold">{product.stock}</span></p>
          </div>
        </div>

        {/* Botones de Acción (Visibles por defecto para evitar fallos de interacción) */}
        <div className="absolute top-3 right-3 flex gap-1 bg-white/90 backdrop-blur-sm p-1 rounded-lg border border-gray-100 shadow-sm z-10">
          <button 
            type="button"
            onClick={() => setIsEditing(true)}
            className="p-1.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors" 
            title="Editar Producto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
          
          <form action={async () => {
            if (confirm(`¿Estás seguro de eliminar "${product.name}"?`)) {
              // Manejamos la respuesta de la acción y mostramos la alerta si hay error
              const result = await deleteProduct(product.id);
              if (result?.error) {
                alert(result.error);
              }
            }
          }}>
            <button 
              type="submit" 
              className="p-1.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors" 
              title="Eliminar Producto"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </form>
        </div>

      </div>

      {/* Modal para Editar */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative">
            <h3 className="text-xl font-bold text-isa-rosa-1 mb-4 pb-2 border-b border-gray-100">Editar Producto</h3>
            
            <form action={async (formData) => {
              await updateProduct(formData);
              setIsEditing(false);
            }} className="flex flex-col gap-3">
              <input type="hidden" name="id" value={product.id} />

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Nombre</label>
                <input type="text" name="name" defaultValue={product.name} required className="w-full border border-gray-300 rounded-md p-2 text-sm outline-none focus:border-isa-rosa-1 bg-isa-beige-4" />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Categoría</label>
                <select name="category" defaultValue={product.category} required className="w-full border border-gray-300 rounded-md p-2 text-sm outline-none focus:border-isa-rosa-1 bg-isa-beige-4">
                  <option value="Bolsos">Bolsos</option>
                  <option value="Bolsas de mano">Bolsas de mano</option>
                  <option value="Monederos">Monederos</option>
                  <option value="Correas">Correas</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Descripción</label>
                <textarea name="description" rows={3} defaultValue={product.description} className="w-full border border-gray-300 rounded-md p-2 text-sm outline-none focus:border-isa-rosa-1 bg-isa-beige-4"></textarea>
              </div>

              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Precio ($)</label>
                  <input type="number" name="price" defaultValue={product.price} required min="0" step="0.01" className="w-full border border-gray-300 rounded-md p-2 text-sm outline-none focus:border-isa-rosa-1 bg-isa-beige-4" />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Stock</label>
                  <input type="number" name="stock" defaultValue={product.stock} required min="0" className="w-full border border-gray-300 rounded-md p-2 text-sm outline-none focus:border-isa-rosa-1 bg-isa-beige-4" />
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4 pt-2 border-t border-gray-100">
                <button 
                  type="button" 
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md font-medium transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 text-sm text-white bg-isa-rosa-1 hover:bg-isa-soft-rosa-2 rounded-md font-medium transition-colors"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}