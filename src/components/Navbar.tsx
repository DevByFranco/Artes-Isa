"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cartStore";
import CartModal from "./CartModal";

export default function Navbar() {
  const pathname = usePathname();
  const cartCount = useCartStore((state) => state.cartCount());
  
  const [isMounted, setIsMounted] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Nuevo estado para el menú de hamburguesa en celular
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
            <Image 
              src="/Logo.png" 
              alt="Artes Isa Logo" 
              width={45} 
              height={45}
              className="rounded-lg"
            />
            <span className="font-bold text-xl text-[#8A9A86] tracking-wide hidden sm:block">
              Artes Isa
            </span>
          </Link>

          {/* Menú para Computadoras (Desktop) */}
          <div className="hidden md:flex items-center gap-8 font-medium text-gray-600">
            {/* Arreglamos el enlace para que apunte a la sección de categorías */}
            <Link href="/#categorias" className="hover:text-[#C6A664] transition-colors">Categorías</Link>
            <Link href="/sobre-nosotros" className="hover:text-[#C6A664] transition-colors">Sobre Nosotros</Link>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-600 hover:text-[#8A9A86] transition-colors flex items-center gap-2 group"
            >
              <span className="hidden sm:block text-sm font-medium group-hover:text-[#8A9A86]">Carrito</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              <span className="absolute top-0 right-0 bg-[#C6A664] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center translate-x-1 -translate-y-1">
                {isMounted ? cartCount : 0}
              </span>
            </button>

            {/* Botón de Hamburguesa SOLO para Celulares */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-[#8A9A86] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </div>

        {/* Menú Desplegable para Celulares */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 shadow-md flex flex-col py-4 px-6 gap-4 font-medium text-gray-600 animate-fade-in">
            <Link 
              href="/" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="hover:text-[#C6A664] transition-colors"
            >
              Inicio
            </Link>
            <Link 
              href="/#categorias" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="hover:text-[#C6A664] transition-colors"
            >
              Categorías
            </Link>
            <Link 
              href="/sobre-nosotros" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="hover:text-[#C6A664] transition-colors"
            >
              Sobre Nosotros
            </Link>
          </div>
        )}
      </nav>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}