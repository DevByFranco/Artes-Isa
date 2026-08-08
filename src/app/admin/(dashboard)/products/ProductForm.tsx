"use client";

import { useState } from "react";
import { createProduct } from "./actions";

export default function ProductForm() {
  // Estado para guardar la categoría seleccionada en tiempo real
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <form action={createProduct} className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del producto</label>
        <input type="text" name="name" required className="w-full border border-gray-300 rounded-md p-2 focus:ring-[#C6A664] focus:border-[#C6A664] outline-none" placeholder="Ej. Bolso Tote Clásico" />
      </div>

      <div className="flex gap-4">
        {/* Selector de Categoría Principal */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
          <select 
            name="category" 
            required 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-[#C6A664] focus:border-[#C6A664] outline-none bg-white"
          >
            <option value="">Selecciona...</option>
            <option value="Bolsos">Bolsos</option>
            <option value="Monederos">Monederos</option>
            <option value="Correas">Correas</option>
            <option value="Carteras">Carteras</option>
          </select>
        </div>
        
        {/* Renderizado Condicional: Solo aparece si selecciona "Bolsos" */}
        {selectedCategory === "Bolsos" && (
          <div className="flex-1 animate-in fade-in zoom-in duration-300">
            <label className="block text-sm font-medium text-gray-700 mb-1">Subcategoría</label>
            <select name="subcategory" required className="w-full border border-gray-300 rounded-md p-2 focus:ring-[#C6A664] focus:border-[#C6A664] outline-none bg-white">
              <option value="">Selecciona..</option>
              <option value="Bolsos de mano">Bolsos de mano</option>
              <option value="Mano libre">Mano libre</option>
              <option value="Maletas">Maletas</option>
              <option value="Morrales">Morrales</option>
              <option value="Bandoleras">Bandoleras</option>
            </select>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
        <textarea name="description" rows={3} required className="w-full border border-gray-300 rounded-md p-2 focus:ring-[#C6A664] focus:border-[#C6A664] outline-none" placeholder="Detalles de cuero, medidas, etc."></textarea>
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
  );
}