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
import { Textarea } from '@/components/ui/textarea'
import { Search, Plus, Edit, Trash2 } from 'lucide-react'

// Mock data - replace with real data from Supabase
const mockRooms = [
  {
    id: '1',
    roomNumber: '101',
    roomType: 'Doble',
    description: 'INDIVIDUAL Y MATRIMONIAL',
    status: 'Disponible'
  },
  {
    id: '2',
    roomNumber: '102',
    roomType: 'Matrimonial',
    description: 'MATRIMONIALES',
    status: 'Disponible'
  },
  {
    id: '3',
    roomNumber: '103',
    roomType: 'Matrimonial',
    description: 'MATRIMONIALES',
    status: 'Disponible'
  },
  {
    id: '4',
    roomNumber: '201',
    roomType: 'Doble',
    description: 'matrimonial',
    status: 'Disponible'
  },
  {
    id: '5',
    roomNumber: '202',
    roomType: 'Sencilla',
    description: 'MATRIMONIALES',
    status: 'Disponible'
  },
  {
    id: '6',
    roomNumber: '203',
    roomType: 'Doble',
    description: 'INDIVIDUAL Y MATRIMONIAL',
    status: 'Disponible'
  },
  {
    id: '7',
    roomNumber: '204',
    roomType: 'Sencilla',
    description: 'MATRIMONIAL',
    status: 'Disponible'
  }
]

export default function HabitacionesPage() {
  const [rooms, setRooms] = useState(mockRooms)
  const [searchTerm, setSearchTerm] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingRoom, setEditingRoom] = useState<any>(null)
  const [formData, setFormData] = useState({
    roomNumber: '',
    roomType: 'Doble',
    rate: '',
    packageId: '',
    description: ''
  })

  const filteredRooms = rooms.filter(room =>
    room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.roomType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingRoom) {
      // Update existing room
      setRooms(rooms.map(room => 
        room.id === editingRoom.id 
          ? { ...room, ...formData, status: 'Disponible' }
          : room
      ))
    } else {
      // Add new room
      const newRoom = {
        id: Date.now().toString(),
        ...formData,
        status: 'Disponible'
      }
      setRooms([...rooms, newRoom])
    }
    
    setIsDialogOpen(false)
    setEditingRoom(null)
    setFormData({
      roomNumber: '',
      roomType: 'Doble',
      rate: '',
      packageId: '',
      description: ''
    })
  }

  const handleEdit = (room: any) => {
    setEditingRoom(room)
    setFormData({
      roomNumber: room.roomNumber,
      roomType: room.roomType,
      rate: room.rate || '',
      packageId: room.packageId || '',
      description: room.description
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (roomId: string) => {
    setRooms(rooms.filter(room => room.id !== roomId))
  }

  const handleNewRoom = () => {
    setEditingRoom(null)
    setFormData({
      roomNumber: '',
      roomType: 'Doble',
      rate: '',
      packageId: '',
      description: ''
    })
    setIsDialogOpen(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Disponible':
        return <Badge className="bg-green-100 text-green-800">Disponible</Badge>
      case 'Ocupada':
        return <Badge className="bg-red-100 text-red-800">Ocupada</Badge>
      case 'Mantenimiento':
        return <Badge className="bg-yellow-100 text-yellow-800">Mantenimiento</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Habitaciones</h1>
          <p className="text-gray-600">Gestión de habitaciones del hotel</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* New Room Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              Nueva Habitación
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={handleNewRoom} className="w-full">
              Agregar Nueva Habitación
            </Button>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-blue-600">
              📊 Total de Habitaciones
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-3xl font-bold">{rooms.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-center text-green-600">
              ✅ Disponibles
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-3xl font-bold">
              {rooms.filter(r => r.status === 'Disponible').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-center text-red-600">
              🏠 Ocupadas
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-3xl font-bold">
              {rooms.filter(r => r.status === 'Ocupada').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Room List */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Lista de Habitaciones</CardTitle>
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
                <TableHead>Nombre de Habitación</TableHead>
                <TableHead>Tipo de Habitación</TableHead>
                <TableHead>Descripción de Habitación</TableHead>
                <TableHead>Estatus</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRooms.map((room) => (
                <TableRow key={room.id}>
                  <TableCell className="font-medium">{room.roomNumber}</TableCell>
                  <TableCell>{room.roomType}</TableCell>
                  <TableCell>{room.description}</TableCell>
                  <TableCell>{getStatusBadge(room.status)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(room)}
                        className="text-blue-600"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(room.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-600">
              Registros Totales {filteredRooms.length} Registros mostrados (1 - {Math.min(10, filteredRooms.length)})
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">← Anterior</Button>
              <Button variant="default" size="sm">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <Button variant="outline" size="sm">4</Button>
              <Button variant="outline" size="sm">Siguiente →</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Room Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingRoom ? 'Editar Habitación' : 'Datos de la Habitación'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="roomNumber">Nombre de Habitación</Label>
              <Input
                id="roomNumber"
                value={formData.roomNumber}
                onChange={(e) => setFormData({...formData, roomNumber: e.target.value})}
                placeholder="101"
                required
              />
            </div>

            <div>
              <Label htmlFor="roomType">Tipo de Habitación</Label>
              <Select value={formData.roomType} onValueChange={(value) => setFormData({...formData, roomType: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Doble">Doble</SelectItem>
                  <SelectItem value="Matrimonial">Matrimonial</SelectItem>
                  <SelectItem value="Sencilla">Sencilla</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="rate">Tarifa</Label>
              <Select value={formData.rate} onValueChange={(value) => setFormData({...formData, rate: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tarifa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="550.00">$550.00</SelectItem>
                  <SelectItem value="650.00">$650.00</SelectItem>
                  <SelectItem value="750.00">$750.00</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="packageId">Paquete Ingreso</Label>
              <Select value={formData.packageId} onValueChange={(value) => setFormData({...formData, packageId: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar paquete" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paquete-base">Paquete Base</SelectItem>
                  <SelectItem value="paquete-3">Paquete 3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Descripción de la habitación"
                rows={3}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cerrar
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                {editingRoom ? 'Actualizar' : 'Guardar'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}