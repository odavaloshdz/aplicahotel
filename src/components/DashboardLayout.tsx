'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import {
  Users,
  ShoppingCart,
  CreditCard,
  UserCheck,
  Receipt,
  Bed,
  UserPlus,
  FileText,
  Package,
  Shield,
  Wrench,
  Calendar,
  BarChart3,
  BookOpen,
  Settings,
  Building,
  DollarSign,
  StickyNote,
  LogOut,
  Menu,
  X
} from 'lucide-react'

const menuItems = [
  { href: '/dashboard/clientes', label: 'Clientes', icon: Users },
  { href: '/dashboard/compras', label: 'Compras', icon: ShoppingCart },
  { href: '/dashboard/cuentas-banco', label: 'Cuentas de Banco', icon: CreditCard },
  { href: '/dashboard/empleados', label: 'Empleados', icon: UserCheck },
  { href: '/dashboard/gastos-extra', label: 'Gastos Extra', icon: Receipt },
  { href: '/dashboard/habitaciones', label: 'Habitaciones', icon: Bed },
  { href: '/dashboard/hospedados', label: 'Hospedados', icon: UserPlus },
  { href: '/dashboard/notas-reservacion', label: 'Notas Reservacion', icon: FileText },
  { href: '/dashboard/paquetes-ingreso', label: 'Paquetes Ingreso', icon: Package },
  { href: '/dashboard/privilegios', label: 'Privilegios', icon: Shield },
  { href: '/dashboard/productos-servicios', label: 'Productos/Servicios', icon: Wrench },
  { href: '/dashboard/proximas-visitas', label: 'Próximas Visitas', icon: Calendar },
  { href: '/dashboard/reportes', label: 'Reportes', icon: BarChart3 },
  { href: '/dashboard/reservaciones', label: 'Reservaciones', icon: BookOpen },
  { href: '/dashboard/roles', label: 'Roles', icon: Settings },
  { href: '/dashboard/sucursales', label: 'Sucursales', icon: Building },
  { href: '/dashboard/tarifas-dinamicas', label: 'Tarifas Dinamicas', icon: DollarSign },
  { href: '/dashboard/ver-notas', label: 'Ver Notas', icon: StickyNote },
]

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <div className="text-xl font-bold text-gray-800">AplicaHotel</div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-4 border-b">
          <div className="text-sm text-gray-600">MENÚ</div>
        </div>

        <ScrollArea className="flex-1 px-3 py-2">
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-blue-500 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="mr-3 h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </ScrollArea>

        <div className="p-4 border-t">
          <div className="text-xs text-gray-500 text-center">
            © Propiedad de AplicaHotel 2025
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-4">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden mr-2"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-4 w-4" />
            </Button>
            <div className="text-sm text-gray-600">
              Inicio
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-700">
              Hola {user?.user_metadata?.full_name || user?.email}
            </div>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Salir
            </Button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}