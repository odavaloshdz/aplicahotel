// Create placeholder pages for remaining modules
const modules = [
  'gastos-extra',
  'notas-reservacion', 
  'paquetes-ingreso',
  'privilegios',
  'productos-servicios',
  'proximas-visitas',
  'reportes',
  'roles',
  'sucursales',
  'tarifas-dinamicas',
  'ver-notas'
]

export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-600">Módulo en desarrollo</p>
      </div>
      <div className="bg-white p-8 rounded-lg shadow">
        <p className="text-gray-600">Este módulo estará disponible próximamente.</p>
      </div>
    </div>
  )
}