import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Actualizamos los metadatos de tu tienda
export const metadata: Metadata = {
  title: "Artes Isa | Catálogo",
  description: "Bolsos y accesorios exclusivos hechos con amor.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es" // Cambiamos el idioma principal a español
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FDFBF7]">
        
        {/* El Navbar aparecerá en todas las páginas públicas */}
        <Navbar />
        
        {/* Aquí se renderiza el contenido de cada página (como page.tsx) */}
        {children}
        
      </body>
    </html>
  );
}