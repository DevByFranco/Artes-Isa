import { signOut } from "@/auth";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Menú Lateral (Sidebar) */}
      <aside className="w-64 bg-white shadow-md flex flex-col justify-between">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900">Artes Isa</h1>
          <nav className="mt-8 flex flex-col gap-2">
            <Link href="/admin" className="p-3 text-gray-700 hover:bg-gray-100 hover:text-black rounded-md font-medium">
              Inicio
            </Link>
            <Link href="/admin/layaways" className="p-3 text-gray-700 hover:bg-gray-100 hover:text-black rounded-md font-medium">
              Sistema de Apartados
            </Link>
            <Link href="/admin/products" className="p-3 text-gray-700 hover:bg-gray-100 hover:text-black rounded-md font-medium">
              Productos
            </Link>
            <Link href="/admin/users" className="p-3 text-gray-700 hover:bg-gray-100 hover:text-black rounded-md font-medium">
              Usuarios
            </Link>
          </nav>
        </div>
        
        {/* Botón de Cerrar Sesión */}
        <div className="p-6 border-t">
          <form
            action={async () => {
              "use server";
              // Destruye la sesión y redirige al login
              await signOut({ redirectTo: "/admin/login" });
            }}
          >
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors font-medium"
            >
              Cerrar Sesión
            </button>
          </form>
        </div>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 p-8 text-black">
        {children}
      </main>
    </div>
  );
}