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
import { Search, Plus, Edit, DollarSign } from 'lucide-react'

// Mock data - replace with real data from Supabase
const mockReservations = [
  {
    id: '1',
    ticketNumber: 'HSB294',
    clientName: 'OSCAR SOMERA',
    clientType: 'Viajero',
    phone: '7221158460',
    room: '201 (MATRIMONIAL)',
    checkIn: '2017-08-14',
    checkOut: '2017-08-16',
    amount: '$1,900.00',
    email: ''
  },
  {
    id: '2',
    ticketNumber: 'HSB295',
    clientName: 'OSCAR SOMERA',
    clientType: 'Viajero',
    phone: '7221158460',
    room: '201 (MATRIMONIAL)',
    checkIn: '2017-08-14',
    checkOut: '2017-08-16',
    amount: '$1,900.00',
    email: ''
  },
  {
    id: '3',
    ticketNumber: 'HSB296',
    clientName: 'RUBEN PERALTA',
    clientType: 'Viajero',
    phone: '5577900231',
    room: '301 (MATRIMONIAL)',
    checkIn: '2017-08-14',
    checkOut: '2017-08-15',
    amount: '$950.00',
    email: ''
  }
]

export default function ReservacionesPage() {
  const [reservations, setReservations] = useState(mockReservations)
  const [searchTerm, setSearchTerm] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingReservation, setEditingReservation] = useState<any>(null)
  const [formData, setFormData] = useState({
    clientName: '',
    phone: '',
    room: '',
    checkIn: '',
    checkOut: '',
    amount: ''
  })

  const filteredReservations = reservations.filter(reservation =>
    reservation.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reservation.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reservation.phone.includes(searchTerm)
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingReservation) {
      // Update existing reservation
      setReservations(reservations.map(reservation => 
        reservation.id === editingReservation.id 
          ? { ...reservation, ...formData }
          : reservation
      ))
    } else {
      // Add new reservation
      const newReservation = {
        id: Date.now().toString(),
        ticketNumber: `HSB${Math.floor(Math.random() * 1000)}`,
        clientType: 'Viajero',
        email: '',
        ...formData
      }
      setReservations([...reservations, newReservation])
    }
    
    setIsDialogOpen(false)
    setEditingReservation(null)
    setFormData({
      clientName: '',
      phone: '',
      room: '',
      checkIn: '',
      checkOut: '',
      amount: ''
    })
  }

  const handleEdit = (reservation: any) => {
    setEditingReservation(reservation)
    setFormData({
      clientName: reservation.clientName,
      phone: reservation.phone,
      room: reservation.room,
      checkIn: reservation.checkIn,
      checkOut: reservation.checkOut,
      amount: reservation.amount
    })
    setIsDialogOpen(true)
  }

  const handleNewReservation = () => {
    setEditingReservation(null)
    setFormData({
      clientName: '',
      phone: '',
      room: '',
      checkIn: '',
      checkOut: '',
      amount: ''
    })
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
          <h1 className="text-3xl font-bold text-gray-900">Reservaciones</h1>
          <p className="text-gray-600">Gestión de reservaciones del hotel</p>
        </div>
        <Button onClick={handleNewReservation} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          Nueva Reservación
        </Button>
      </div>

      {/* Reservations List */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Lista de Reservaciones</CardTitle>
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
                <TableHead>Celular</TableHead>
                <TableHead>Habitación</TableHead>
                <TableHead>Monto Ingreso</TableHead>
                <TableHead>Monto Salida</TableHead>
                <TableHead>Monto Deuda</TableHead>
                <TableHead>Correo Electrónico</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReservations.map((reservation) => (
                <TableRow key={reservation.id}>
                  <TableCell className="font-medium">{reservation.ticketNumber}</TableCell>
                  <TableCell>{reservation.clientName}</TableCell>
                  <TableCell>{getClientTypeBadge(reservation.clientType)}</TableCell>
                  <TableCell>{reservation.phone}</TableCell>
                  <TableCell>{reservation.room}</TableCell>
                  <TableCell>{reservation.checkIn}</TableCell>
                  <TableCell>{reservation.checkOut}</TableCell>
                  <TableCell>{reservation.amount}</TableCell>
                  <TableCell>{reservation.email}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="default"
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => handleEdit(reservation)}
                      >
                        <DollarSign className="h-4 w-4 mr-1" />
                        Registrar Ingreso
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
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <Button variant="outline" size="sm">4</Button>
              <Button variant="outline" size="sm">5</Button>
              <Button variant="outline" size="sm">Siguiente →</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reservation Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingReservation ? `Ingreso - Reservación ${editingReservation.ticketNumber}` : 'Nueva Reservación'}
            </DialogTitle>
          </DialogHeader>
          
          {editingReservation ? (
            // Payment form for existing reservation
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Reservation Details */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      🏠 Detalles de Reservación
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-lg font-semibold">Le Atiende</div>
                      <div className="text-2xl font-bold mt-2">Lorenzo</div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label>Ingreso:</Label>
                        <Input value={editingReservation.checkIn} readOnly />
                      </div>
                      <div>
                        <Label>Salida:</Label>
                        <Input value={editingReservation.checkOut} readOnly />
                      </div>
                      <div>
                        <Label>Total de Noches:</Label>
                        <Input value="2" readOnly />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label>Habitación(es)</Label>
                        <Input value={editingReservation.room} readOnly />
                      </div>
                      <div>
                        <Label>Tarifa por Noche</Label>
                        <Input value="$950.00" readOnly />
                      </div>
                      <div>
                        <Label>Calidad y Tipo de Habitación</Label>
                        <Input value="MATRIMONIAL" readOnly />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Payment Options */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      💳 Opciones de Pago
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar método" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="efectivo">Efectivo</SelectItem>
                        <SelectItem value="tarjeta">Tarjeta</SelectItem>
                        <SelectItem value="transferencia">Transferencia</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>
                
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      👥 Clientes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Agregar Nuevo Cliente
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      💰 Cantidad Total
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-3xl font-bold">TOTAL A PAGAR</div>
                    <div className="text-4xl font-bold text-green-600 mt-2">$00.00</div>
                    <div className="mt-4">
                      <Label>Cantidad Recibida:</Label>
                      <Input className="mt-2" placeholder="$0.00" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            // New reservation form
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="clientName">Nombre del Cliente</Label>
                  <Input
                    id="clientName"
                    value={formData.clientName}
                    onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="room">Habitación</Label>
                <Select value={formData.room} onValueChange={(value) => setFormData({...formData, room: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar habitación" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="101 (DOBLE)">101 (DOBLE)</SelectItem>
                    <SelectItem value="102 (MATRIMONIAL)">102 (MATRIMONIAL)</SelectItem>
                    <SelectItem value="103 (SENCILLA)">103 (SENCILLA)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="checkIn">Fecha de Ingreso</Label>
                  <Input
                    id="checkIn"
                    type="date"
                    value={formData.checkIn}
                    onChange={(e) => setFormData({...formData, checkIn: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="checkOut">Fecha de Salida</Label>
                  <Input
                    id="checkOut"
                    type="date"
                    value={formData.checkOut}
                    onChange={(e) => setFormData({...formData, checkOut: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="amount">Monto Total</Label>
                <Input
                  id="amount"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  placeholder="$0.00"
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  {editingReservation ? 'Procesar Pago' : 'Crear Reservación'}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}