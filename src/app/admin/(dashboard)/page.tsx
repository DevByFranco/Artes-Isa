export default function AdminDashboard() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold text-isa-dark mb-4">
        Panel Principal
      </h1>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <p className="text-lg text-gray-700 mb-2">
          ¡Bienvenido al sistema de administración de Artes Isa!
        </p>
        <p className="text-gray-500">
          Utiliza el menú lateral para navegar entre las diferentes opciones. Desde aquí podrás gestionar tus bolsos, revisar los abonos de tus clientes y administrar la plataforma.
        </p>
      </div>
    </div>
  );
}