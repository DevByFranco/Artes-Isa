"use client";

import { useState } from "react";
import { createLayawayAction } from "@/actions/apartadosActions";

type ProductBasics = { id: string; name: string; price: number };

export default function NewLayawayForm({ products }: { products: ProductBasics[] }) {
  const [selectedProduct, setSelectedProduct] = useState<ProductBasics | null>(null);

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const found = products.find(p => p.id === e.target.value);
    setSelectedProduct(found || null);
  };

  return (
    <form action={createLayawayAction} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-6">
      
      {/* 1. Datos del Cliente */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">1. Datos del Cliente</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
            <input type="text" name="name" required className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8A9A86] outline-none" placeholder="Ej. María Pérez" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono (WhatsApp)</label>
            <input type="tel" name="phone" required className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8A9A86] outline-none" placeholder="Ej. 3001234567" />
          </div>
        </div>
      </div>

      {/* 2. Detalles del Producto */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">2. Producto a Apartar</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Seleccionar Producto</label>
            <select name="productId" required onChange={handleProductChange} className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8A9A86] outline-none bg-white">
              <option value="">-- Elige un producto --</option>
              {products.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Precio Total</label>
            <div className="w-full p-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-600 font-medium">
              ${selectedProduct ? selectedProduct.price : "0"}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Primer Pago */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">3. Abono Inicial</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Monto del Abono ($)</label>
            <input type="number" name="initialPayment" required min="1" max={selectedProduct?.price || 10000000} className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8A9A86] outline-none" placeholder="Ej. 50000" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Método de Pago</label>
            <select name="paymentMethod" required className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8A9A86] outline-none bg-white">
              <option value="EFECTIVO">Efectivo</option>
              <option value="TRANSFERENCIA">Transferencia Bancaria</option>
              <option value="NEQUI">Nequi / Daviplata</option>
            </select>
          </div>
        </div>
      </div>

      {/* Botón de Enviar */}
      <div className="pt-4">
        <button type="submit" className="w-full bg-[#8A9A86] hover:bg-[#748371] text-white py-3 rounded-lg font-bold transition-colors shadow-sm text-lg">
          Crear Apartado
        </button>
      </div>
    </form>
  );
}