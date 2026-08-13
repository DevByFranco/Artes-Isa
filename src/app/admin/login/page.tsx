"use client";

import { useActionState } from "react";
import { authenticate } from "./actions";

export default function LoginPage() {
  // useActionState maneja el estado de la función de servidor (errores y carga)
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-isa-beige-4">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 w-full max-w-md">
        
        <h1 className="text-2xl font-bold text-center mb-6 text-isa-dark">
          Administración Artes Isa
        </h1>
        
        <form action={formAction} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium text-isa-dark mb-1">
              Correo Electrónico
            </label>
            <input 
              type="email" 
              name="email"
              required
              className="w-full border border-gray-300 rounded-md p-2.5 outline-none focus:ring-2 focus:ring-isa-gold focus:border-transparent transition-all bg-isa-beige-4"
              placeholder="admin@artesisa.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-isa-dark mb-1">
              Contraseña
            </label>
            <input 
              type="password" 
              name="password"
              required
              className="w-full border border-gray-300 rounded-md p-2.5 outline-none focus:ring-2 focus:ring-isa-gold focus:border-transparent transition-all bg-isa-beige-4"
              placeholder="••••••••"
            />
          </div>

          {/* Mostrar mensaje de error si las credenciales son incorrectas */}
          {errorMessage && (
            <p className="text-sm text-red-500 font-medium text-center">
              {errorMessage}
            </p>
          )}
          
          <button 
            type="submit" 
            disabled={isPending}
            className="w-full bg-isa-soft-rosa-2 text-white font-medium py-2.5 rounded-md hover:bg-isa-rosa-1 transition-colors mt-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isPending ? "Iniciando sesión..." : "Iniciar Sesión"}
          </button>
        </form>

      </div>
    </div>
  );
}