import Link from "next/link";
import Image from "next/image";
import { signOut } from "@/auth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-isa-cream">
      
      {/* Barra Lateral (Sidebar) */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm">
        
        {/* Encabezado con Logo */}
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
          <Link href="/admin/usuarios" className="p-2.5 hover:bg-isa-cream hover:text-isa-green rounded-md text-gray-700 font-medium transition-colors">
            Usuarios
          </Link>
        </nav>
      </aside>

      {/* Contenedor Principal (Top Bar + Contenido) */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* BARRA SUPERIOR (Top Bar) */}
        <header className="bg-white border-b border-gray-100 h-16 flex items-center justify-end px-8 shadow-sm shrink-0">
          <form 
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/admin/login" });
            }}
          >
            <button 
              type="submit" 
              className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 bg-red-50 px-4 py-2 rounded-lg transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Cerrar Sesión
            </button>
          </form>
        </header>

        {/* Contenido de la página */}
        <main className="flex-1 p-8 overflow-y-auto bg-isa-cream/30">
          {children}
        </main>
      </div>
      
    </div>
  );
}