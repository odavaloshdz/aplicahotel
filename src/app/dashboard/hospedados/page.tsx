'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Search, Plus, Edit, Check, RotateCcw } from 'lucide-react'

// Mock data - replace with real data from Supabase
const mockReservations = [
  {
    id: '1',
    ticketNumber: 'HSL313',
    clientName: 'albertano sanches',
    clientType: 'Viajero',
    occupiedRooms: '102,103,101',
    actions: ['check', 'change-room']
  },
  {
    id: '2',
    ticketNumber: 'HSL322',
    clientName: 'Alondra Gonzalez',
    clientType: 'Viajero',
    occupiedRooms: '104',
    actions: ['check', 'change-room']
  },
  {
    id: '3',
    ticketNumber: 'HSL323',
    clientName: 'adelina pasero',
    clientType: 'Viajero',
    occupiedRooms: '201',
    actions: ['check', 'change-room']
  },
  {
    id: '4',
    ticketNumber: 'HSL324',
    clientName: 'Alondra Gonzalez',
    clientType: 'Viajero',
    occupiedRooms: '303,304',
    actions: ['check', 'change-room']
  },
  {
    id: '5',
    ticketNumber: 'HSL326',
    clientName: 'Alonso Bautista',
    clientType: 'Viajero',
    occupiedRooms: '204',
    actions: ['check', 'change-room']
  }
]

export default function ReservacionesPage() {
  const [reservations, setReservations] = useState(mockReservations)
  const [searchTerm, setSearchTerm] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingReservation, setEditingReservation] = useState<any>(null)

  const filteredReservations = reservations.filter(reservation =>
    reservation.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reservation.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reservation.occupiedRooms.includes(searchTerm)
  )

  const handleEdit = (reservation: any) => {
    setEditingReservation(reservation)
    setIsDialogOpen(true)
  }

  const handleNewReservation = () => {
    setEditingReservation(null)
    setIsDialogOpen(true)
  }

  const getClientTypeBadge = (type: string) => {
    return type === 'Viajero' 
      ? <Badge className="bg-green-100 text-green-800">Viajero</Badge>
      : <Badge className="bg-red-100 text-red-800">Organizador</Badge>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hospedados</h1>
          <p className="text-gray-600">Gestión de huéspedes actuales</p>
        </div>
      </div>

      {/* Reservations List */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Lista de Hospedados</CardTitle>
            <div className="flex items-center space-x-2">
              <Select defaultValue="10">
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-gray-600">Registros por página</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Numero de Ticket/Reservación</TableHead>
                <TableHead>Nombre del Cliente</TableHead>
                <TableHead>Tipo de Cliente</TableHead>
                <TableHead>Habitaciones Ocupadas</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReservations.map((reservation) => (
                <TableRow key={reservation.id}>
                  <TableCell className="font-medium">{reservation.ticketNumber}</TableCell>
                  <TableCell>{reservation.clientName}</TableCell>
                  <TableCell>{getClientTypeBadge(reservation.clientType)}</TableCell>
                  <TableCell>{reservation.occupiedRooms}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="default"
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Check className="h-4 w-4 mr-1" />
                        ✓
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        className="bg-blue-500 hover:bg-blue-600"
                        onClick={() => handleEdit(reservation)}
                      >
                        <RotateCcw className="h-4 w-4 mr-1" />
                        Cambiar Habitación
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-600">
              Registros Totales {filteredReservations.length} Registros mostrados (1 - {Math.min(10, filteredReservations.length)})
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">← Anterior</Button>
              <Button variant="default" size="sm">1</Button>
              <Button variant="outline" size="sm">Siguiente →</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              Cambiar Habitación - {editingReservation?.ticketNumber}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Cliente: {editingReservation?.clientName}</Label>
            </div>
            <div>
              <Label>Habitaciones Actuales: {editingReservation?.occupiedRooms}</Label>
            </div>
            <div>
              <Label htmlFor="newRoom">Nueva Habitación</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar habitación disponible" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="105">105 - Doble</SelectItem>
                  <SelectItem value="106">106 - Matrimonial</SelectItem>
                  <SelectItem value="107">107 - Sencilla</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Cambiar Habitación
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}