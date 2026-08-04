"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    // NextAuth se encarga de buscar al usuario con la lógica de tu auth.ts
    await signIn("credentials", formData, {
      redirectTo: "/admin", // Redirigir al panel si es exitoso
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Correo o contraseña incorrectos.";
        default:
          return "Ocurrió un error al iniciar sesión.";
      }
    }
    // Es necesario volver a lanzar el error para que funcionen las redirecciones de Next.js
    throw error;
  }
}