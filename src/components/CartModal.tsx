"use client";

import Image from "next/image";
import { useCartStore } from "@/store/cartStore";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { items, updateQuantity, cartTotal } = useCartStore();

  const WHATSAPP_NUMBER = "573122737377"; // Asegúrate de poner tu número

  const handleCheckoutWhatsApp = () => {
    if (items.length === 0) return;

    let message = "¡Hola *Artes Isa*! 👋 Quisiera realizar el siguiente pedido:\n\n";

    items.forEach((item) => {
      const subtotal = (item.product.price * item.quantity).toLocaleString("es-CO");
      message += `• *${item.quantity}x* ${item.product.name} - $${subtotal}\n`;
    });

    message += `\n*Total a pagar:* $${cartTotal().toLocaleString("es-CO")}\n\n`;
    message += "¿Me indican las instrucciones para realizar el pago?";

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex justify-end">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-right">
        
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-isa-rosa-1">Tu Carrito</h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-800 transition-colors rounded-full hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p>Tu carrito está vacío.</p>
            </div>
          ) : (
            <ul className="space-y-6">
              {items.map((item) => (
                <li key={item.product.id} className="flex gap-4 items-center border-b border-gray-50 pb-4">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-50 shrink-0 border border-gray-100">
                    {item.product.images[0] && (
                      <Image 
                        src={item.product.images[0]} 
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>

                  <div className="flex-1 flex flex-col justify-between h-20">
                    {/* Eliminamos el basurero suelto de aquí arriba */}
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="text-sm font-medium text-isa-rosa-1 line-clamp-2">{item.product.name}</h3>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-bold text-isa-beige-">
                        ${(item.product.price * item.quantity).toLocaleString("es-CO")}
                      </span>

                      {/* Selector de Cantidad Inteligente */}
                      <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 h-8">
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-8 h-full flex items-center justify-center text-gray-600 hover:bg-gray-200 rounded-l-lg transition-colors"
                        >
                          {item.quantity === 1 ? (
                            // Si es 1, mostramos el basurero rojo
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          ) : (
                            // Si es mayor a 1, mostramos el signo menos
                            <span className="font-bold text-sm">-</span>
                          )}
                        </button>
                        
                        <span className="w-8 text-center text-xs font-semibold text-gray-800">
                          {item.quantity}
                        </span>
                        
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-8 h-full flex items-center justify-center text-gray-600 hover:bg-gray-200 rounded-r-lg transition-colors font-bold text-sm"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-gray-100 p-6 bg-gray-50">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-600 font-medium">Total estimado</span>
              <span className="text-2xl font-bold text-gray-900">
                ${cartTotal().toLocaleString("es-CO")}
              </span>
            </div>
            <button 
              onClick={handleCheckoutWhatsApp}
              className="w-full bg-isa-rosa-1 text-white py-4 rounded-xl font-medium hover:bg-isa-soft-rosa-2 transition-colors shadow-sm"
            >
              Proceder al pago
            </button>
          </div>
        )}

      </div>
    </div>
  );
}