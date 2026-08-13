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
    <div className="min-h-screen flex flex-col md:flex-row bg-isa-beige-4">
      
      {/* BARRA LATERAL (Desktop) */}
      <aside className="hidden md:flex w-64 bg-isa-rosa-1 border-r border-isa-rosa-1 flex-col shadow-sm shrink-0 z-10">
        <div className="flex items-center gap-3 p-6 border-b border-white/20">
          <Image 
            src="/Logo.png" 
            alt="Logo Artes Isa" 
            width={100}
            height={100}
            className="w-16 h-16 object-contain rounded-md bg-white/50" 
          />
          <div>
            <h2 className="text-xl font-bold text-white leading-none">Artes Isa</h2>
            <p className="text-xs text-white/80 mt-1">Panel de Control</p>
          </div>
        </div>
        
        {/* Usamos flex-1 en el nav para empujar el botón de cerrar sesión hacia abajo */}
        <nav className="flex-1 flex flex-col gap-2 p-4">
          <Link href="/admin" className="p-2.5 hover:bg-isa-almond-3 hover:text-isa-green rounded-md text-white font-medium transition-colors">
            Inicio
          </Link>
          <Link href="/admin/apartados" className="p-2.5 hover:bg-isa-almond-3 hover:text-isa-green rounded-md text-white font-medium transition-colors">
            Sistema de Apartados
          </Link>
          <Link href="/admin/products" className="p-2.5 hover:bg-isa-almond-3 hover:text-isa-green rounded-md text-white font-medium transition-colors">
            Productos
          </Link>
        </nav>

        {/* Botón Cerrar Sesión (Barra Lateral Abajo) */}
        <div className="p-4 border-t border-white/20">
          <form 
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/admin/login" });
            }}
          >
            <button 
              type="submit" 
              className="flex items-center justify-center gap-2 w-full text-sm font-medium text-red-600 hover:text-red-700 bg-white hover:bg-red-50 px-4 py-2.5 rounded-lg transition-colors shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Cerrar Sesión</span>
            </button>
          </form>
        </div>
      </aside>

      {/* CONTENEDOR PRINCIPAL */}
      <div className="flex-1 flex flex-col h-dvh md:h-screen overflow-hidden">
        
        {/* BARRA SUPERIOR (Top Bar - AHORA SOLO VISIBLE EN MÓVIL) */}
        <header className="md:hidden bg-isa-rosa-1 border-b border-isa-rosa-1 h-16 flex items-center justify-between px-4 shadow-sm shrink-0 relative">
          
          {/* Menú de Hamburguesa Móvil */}
          <MobileMenu />
          
          {/* Logo y título centrados (Solo Móvil) */}
          <div className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2 pointer-events-none">
            <Image src="/Logo.png" alt="Logo Mobile" width={28} height={28} className="rounded-md bg-white/50" />
            <span className="font-bold text-white text-lg">Artes Isa</span>
          </div>

          {/* Botón Cerrar Sesión Icono (Solo Móvil) */}
          <div className="flex justify-end">
            <form 
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/admin/login" });
              }}
            >
              <button 
                type="submit" 
                className="flex items-center justify-center p-2 text-red-600 bg-white rounded-md shadow-sm"
                title="Cerrar Sesión"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </form>
          </div>
        </header>

        {/* CONTENIDO DE LA PÁGINA */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-isa-cream/30">
          {children}
        </main>
      </div>
    </div>
  );
}