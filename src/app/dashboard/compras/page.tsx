'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ShoppingCart } from 'lucide-react'

export default function ComprasPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Compras</h1>
        <p className="text-gray-600">Gestión de compras y proveedores</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Módulo de Compras
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Este módulo está en desarrollo. Aquí podrás gestionar las compras, proveedores y control de inventario.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}