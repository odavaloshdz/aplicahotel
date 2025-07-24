"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Home,
  Users,
  Hotel,
  CalendarDays,
  ClipboardList,
  BarChart3,
  Settings,
  LogOut,
  ChevronDown,
  Building,
  Receipt,
  Package,
  FileText,
  ShieldCheck,
  MapPin,
} from "lucide-react";

interface SidebarProps {
  userName?: string;
  userRole?: string;
}

export default function Sidebar({
  userName = "Hola Lorenzo",
  userRole = "Administrador",
}: SidebarProps) {
  const pathname = usePathname();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const menuItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <Home className="h-5 w-5" />,
    },
    { name: "Clientes", href: "/clients", icon: <Users className="h-5 w-5" /> },
    {
      name: "Habitaciones",
      href: "/rooms",
      icon: <Hotel className="h-5 w-5" />,
    },
    {
      name: "Reservaciones",
      href: "/reservations",
      icon: <CalendarDays className="h-5 w-5" />,
    },
    {
      name: "Hospedados",
      href: "/guests",
      icon: <ClipboardList className="h-5 w-5" />,
    },
    {
      name: "Paquetes Ingreso",
      href: "/packages",
      icon: <Package className="h-5 w-5" />,
    },
    {
      name: "Notas Reservación",
      href: "/reservation-notes",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      name: "Cuentas de Banco",
      href: "/bank-accounts",
      icon: <Receipt className="h-5 w-5" />,
    },
    {
      name: "Gastos Extra",
      href: "/expenses",
      icon: <Receipt className="h-5 w-5" />,
    },
    {
      name: "Productos/Servicios",
      href: "/products",
      icon: <Package className="h-5 w-5" />,
    },
    {
      name: "Próximas Visitas",
      href: "/upcoming-visits",
      icon: <CalendarDays className="h-5 w-5" />,
    },
    {
      name: "Reportes",
      href: "/reports",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      name: "Sucursales",
      href: "/branches",
      icon: <Building className="h-5 w-5" />,
    },
    {
      name: "Tarifas Dinámicas",
      href: "/dynamic-rates",
      icon: <Receipt className="h-5 w-5" />,
    },
    {
      name: "Privilegios",
      href: "/privileges",
      icon: <ShieldCheck className="h-5 w-5" />,
    },
    { name: "Roles", href: "/roles", icon: <Users className="h-5 w-5" /> },
    {
      name: "Ver Notas",
      href: "/notes",
      icon: <FileText className="h-5 w-5" />,
    },
  ];

  return (
    <div className="flex flex-col h-full w-60 bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="p-4 border-b border-gray-200">
        <Link href="/dashboard">
          <div className="flex items-center">
            <img
              src="/teknobits-logo.png"
              alt="Teknobits Logo"
              className="h-8 w-auto"
              onError={(e) => {
                e.currentTarget.src =
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=teknobits";
              }}
            />
            <span className="ml-2 text-lg font-semibold text-gray-800">
              Teknobits
            </span>
          </div>
        </Link>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-gray-200">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setIsProfileOpen(!isProfileOpen)}
        >
          <div className="flex items-center">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Lorenzo" />
              <AvatarFallback>LZ</AvatarFallback>
            </Avatar>
            <div className="ml-2">
              <p className="text-sm font-medium">{userName}</p>
              <p className="text-xs text-gray-500">{userRole}</p>
            </div>
          </div>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-gray-500 transition-transform",
              isProfileOpen && "rotate-180",
            )}
          />
        </div>

        {isProfileOpen && (
          <div className="mt-2 space-y-1">
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <Settings className="h-4 w-4 mr-2" />
              Configuración
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-2">
        <nav className="space-y-1 px-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center px-2 py-2 text-sm font-medium rounded-md group",
                  isActive
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100",
                )}
              >
                <span
                  className={cn(
                    "mr-3",
                    isActive
                      ? "text-blue-700"
                      : "text-gray-500 group-hover:text-gray-700",
                  )}
                >
                  {item.icon}
                </span>
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span className="ml-2 text-xs text-gray-500">Hotel Principal</span>
          </div>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
