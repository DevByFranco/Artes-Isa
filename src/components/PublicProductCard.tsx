"use client";

import Image from "next/image";
import { useState } from "react";
import { useCartStore } from "@/store/cartStore";

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
}

export default function PublicProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  
  // Nuevo estado para controlar la animación del botón
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addItem(product);
    
    // Cambiamos el estado para mostrar el mensaje de éxito
    setIsAdded(true);
    
    // Lo regresamos a la normalidad después de 2 segundos (2000 milisegundos)
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col border border-gray-100">
      
      {/* Imagen del Producto */}
      <div className="relative w-full aspect-square overflow-hidden bg-gray-50">
        {product.images[0] ? (
          <Image 
            src={product.images[0]} 
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-400 text-sm">
            Sin imagen
          </div>
        )}
      </div>

      {/* Información para el cliente */}
      <div className="p-5 flex flex-col flex-1">
        <div className="mb-2">
          <span className="text-[10px] font-bold tracking-widest text-[#8A9A86] uppercase">
            {product.category}
          </span>
        </div>
        <h3 className="font-semibold text-gray-800 text-lg mb-1 line-clamp-1">{product.name}</h3>
        <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1 italic">
          {product.description || "Un hermoso diseño de Artes Isa."}
        </p>
        
        {/* Precio y Botón de Añadir */}
        <div className="flex items-center justify-between mt-auto">
          <span className="text-[#C6A664] font-bold text-xl">${product.price}</span>
          
          <button 
            onClick={handleAddToCart}
            disabled={product.stock <= 0 || isAdded}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors disabled:cursor-not-allowed ${
              isAdded 
                ? "bg-green-600 text-white disabled:bg-green-600" 
                : "bg-[#8A9A86] text-white hover:bg-[#748371] disabled:bg-gray-300"
            }`}
          >
            {isAdded ? "¡Añadido! ✓" : product.stock > 0 ? "Añadir" : "Agotado"}
          </button>
        </div>
      </div>
    </div>
  );
}