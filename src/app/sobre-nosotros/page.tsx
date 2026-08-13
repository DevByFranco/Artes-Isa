import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-isa-beige-4">
      
      {/* Sección Hero / Encabezado */}
      <section className="pt-20 pb-12 px-4 md:px-8 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-isa-dark mb-6">
          Sobre Artes Isa
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
          Creando piezas únicas que combinan elegancia, tradición y estilo. Nuestra pasión es diseñar bolsos y accesorios que resalten tu esencia en cada paso que das.
        </p>
      </section>

      {/* Sección de Historia y Misión */}
      <section className="py-12 px-4 md:px-8 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-100">
          
          <div className="relative h-80 md:h-full min-h-75 w-full rounded-xl overflow-hidden shadow-sm">
            <Image 
              src="/Logo.png" 
              alt="Artes Isa Taller" 
              fill
              className="object-cover bg-isa-almond-3" 
            />
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-isa-rosa-1 mb-3">Nuestra Historia</h2>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                Artes Isa nació de la admiración por el trabajo manual y el diseño atemporal. Cada bolso, bolsa de mano y monedero es seleccionado y cuidado con la mayor atención al detalle, garantizando no solo un accesorio hermoso, sino un compañero duradero para tu día a día.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-isa-rosa-1 mb-3">Nuestra Misión</h2>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                Queremos ofrecer productos de alta calidad que sean accesibles y versátiles. Creemos que un buen bolso no es solo un complemento, sino una extensión de tu personalidad. Por eso, también ofrecemos nuestro sistema de apartados, para que esa pieza que tanto deseas esté siempre a tu alcance.
              </p>
            </div>

            <div className="pt-4">
              <Link 
                href="/" 
                className="inline-block bg-isa-dark text-white px-6 py-3 rounded-lg font-medium hover:bg-black transition-colors"
              >
                Ver Catálogo
              </Link>
            </div>
          </div>
          
        </div>
      </section>

    </div>
  );
}