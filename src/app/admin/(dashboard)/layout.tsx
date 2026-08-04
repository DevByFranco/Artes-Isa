import Link from "next/link";
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
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-isa-dark">Artes Isa</h2>
          <p className="text-sm text-gray-500">Panel de Control</p>
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
        
        <div className="p-4 border-t border-gray-200">
          {/* Aquí envolvemos el botón en el formulario de Server Action */}
          <form 
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/admin/login" });
            }}
          >
            <button 
              type="submit" 
              className="w-full text-left p-2.5 hover:bg-red-50 text-red-600 font-medium rounded-md transition-colors"
            >
              Cerrar Sesión
            </button>
          </form>
        </div>
      </aside>

      {/* Contenido Principal (Lo que cambia al navegar) */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
      
    </div>
  );
}