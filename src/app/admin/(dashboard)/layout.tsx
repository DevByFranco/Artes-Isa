import Link from "next/link";
import Image from "next/image";
import { signOut } from "@/auth";
import MobileMenu from "./MobileMenu"; // Importamos el nuevo componente cliente

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-isa-cream">
      
      {/* BARRA LATERAL (Desktop) - Permanece igual */}
      <aside className="hidden md:flex w-64 bg-white border-r border-gray-200 flex-col shadow-sm shrink-0 z-10">
        <div className="flex items-center gap-3 p-6 border-b border-gray-100">
          <Image 
            src="/Logo.png" 
            alt="Logo Artes Isa" 
            width={100}
            height={100}
            className="w-16 h-16 object-contain rounded-md" 
          />
          <div>
            <h2 className="text-xl font-bold text-isa-dark leading-none">Artes Isa</h2>
            <p className="text-xs text-gray-500 mt-1">Panel de Control</p>
          </div>
        </div>
        
        <nav className="flex-1 flex flex-col gap-2 p-4">
          <Link href="/admin" className="p-2.5 hover:bg-isa-cream hover:text-isa-green rounded-md text-gray-700 font-medium transition-colors">
            Inicio
          </Link>
          <Link href="/admin/apartados" className="p-2.5 hover:bg-isa-cream hover:text-isa-green rounded-md text-gray-700 font-medium transition-colors">
            Sistema de Apartados
          </Link>
          <Link href="/admin/products" className="p-2.5 hover:bg-isa-cream hover:text-isa-green rounded-md text-gray-700 font-medium transition-colors">
            Productos
          </Link>
        </nav>
      </aside>

      {/* CONTENEDOR PRINCIPAL */}
      <div className="flex-1 flex flex-col h-dvh md:h-screen overflow-hidden">
        
        {/* BARRA SUPERIOR (Top Bar) */}
        <header className="bg-white border-b border-gray-100 h-16 flex items-center justify-between px-4 md:px-8 shadow-sm shrink-0 relative">
          
          {/* Menú de Hamburguesa Móvil */}
          <MobileMenu />
          
          {/* Logo y título centrados (Solo Móvil) */}
          <div className="md:hidden flex items-center gap-2 absolute left-1/2 -translate-x-1/2 pointer-events-none">
            <Image src="/Logo.png" alt="Logo Mobile" width={28} height={28} className="rounded-md" />
            <span className="font-bold text-isa-dark text-lg">Artes Isa</span>
          </div>

          {/* Botón Cerrar Sesión (Se va a la derecha) */}
          <div className="flex-1 md:flex-none flex justify-end">
            <form 
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/admin/login" });
              }}
            >
              <button 
                type="submit" 
                className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 bg-red-50 px-3 md:px-4 py-2 rounded-lg transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="hidden sm:inline">Cerrar Sesión</span>
                <span className="sm:hidden">Salir</span>
              </button>
            </form>
          </div>
        </header>

        {/* CONTENIDO DE LA PÁGINA */}
        {/* Quitamos el padding extra inferior que tenía la barra vieja */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-isa-cream/30">
          {children}
        </main>
      </div>
    </div>
  );
}