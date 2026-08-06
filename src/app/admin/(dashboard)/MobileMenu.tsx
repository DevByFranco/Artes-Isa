"use client";

import { useState } from "react";
import Link from "next/link";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <div className="md:hidden flex items-center">
      {/* Botón de Hamburguesa */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="p-2 -ml-2 text-gray-600 hover:text-isa-green focus:outline-none transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Fondo oscuro transparente cuando el menú está abierto */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 top-16" 
          onClick={closeMenu}
        />
      )}

      {/* Menú Desplegable */}
      <div 
        className={`absolute top-16 left-0 w-full bg-white border-b border-gray-200 shadow-xl z-50 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col p-4 gap-2">
          <Link href="/admin" onClick={closeMenu} className="p-3 hover:bg-isa-cream rounded-lg text-gray-700 font-medium transition-colors">
            Inicio
          </Link>
          <Link href="/admin/apartados" onClick={closeMenu} className="p-3 hover:bg-isa-cream rounded-lg text-gray-700 font-medium transition-colors">
            Sistema de Apartados
          </Link>
          <Link href="/admin/products" onClick={closeMenu} className="p-3 hover:bg-isa-cream rounded-lg text-gray-700 font-medium transition-colors">
            Productos
          </Link>
        </nav>
      </div>
    </div>
  );
}