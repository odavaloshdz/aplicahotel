'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Search, Plus, Edit, Eye } from 'lucide-react'

// Mock data - replace with real data from Supabase
const mockClients = [
  {
    id: '1',
    name: 'adelina',
    lastName: 'pasero',
    address: 'Queretaro',
    clientType: 'Viajero',
    phone: '4271622004',
    homePhone: '',
    city: 'Queretaro',
    state: 'Queretaro',
    email: '',
    registrationDate: '30-Abril'
  },
  {
    id: '2',
    name: 'Agustin Barbosa',
    lastName: 'Rangel',
    address: '',
    clientType: 'Viajero',
    phone: '8116803037',
    homePhone: '',
    city: 'Monterrey',
    state: 'Nuevo León',
    email: '',
    registrationDate: '30-Abril'
  },
  {
    id: '3',
    name: 'agustin',
    lastName: 'martines',
    address: 'municipio coyotepec',
    clientType: 'Organizador',
    phone: '5529950443',
    homePhone: '',
    city: 'mexico',
    state: 'mexico',
    email: '',
    registrationDate: '30-Marzo'
  }
]

export default function ClientesPage() {
  const [clients, setClients] = useState(mockClients)
  const [searchTerm, setSearchTerm] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingClient, setEditingClient] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    clientType: 'Viajero',
    address: '',
    city: '',
    state: '',
    phone: '',
    homePhone: '',
    email: ''
  })

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm)
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingClient) {
      // Update existing client
      setClients(clients.map(client => 
        client.id === editingClient.id 
          ? { ...client, ...formData }
          : client
      ))
    } else {
      // Add new client
      const newClient = {
        id: Date.now().toString(),
        ...formData,
        registrationDate: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'long' })
      }
      setClients([...clients, newClient])
    }
    
    setIsDialogOpen(false)
    setEditingClient(null)
    setFormData({
      name: '',
      lastName: '',
      clientType: 'Viajero',
      address: '',
      city: '',
      state: '',
      phone: '',
      homePhone: '',
      email: ''
    })
  }

  const handleEdit = (client: any) => {
    setEditingClient(client)
    setFormData({
      name: client.name,
      lastName: client.lastName,
      clientType: client.clientType,
      address: client.address,
      city: client.city,
      state: client.state,
      phone: client.phone,
      homePhone: client.homePhone,
      email: client.email
    })
    setIsDialogOpen(true)
  }

  const handleNewClient = () => {
    setEditingClient(null)
    setFormData({
      name: '',
      lastName: '',
      clientType: 'Viajero',
      address: '',
      city: '',
      state: '',
      phone: '',
      homePhone: '',
      email: ''
    })
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clientes</h1>
          <p className="text-gray-600">Gestión de clientes del hotel</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* New Client Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Cliente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={handleNewClient} className="w-full">
              Agregar Nuevo Cliente
            </Button>
          </CardContent>
        </Card>

        {/* Client List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Lista Clientes</CardTitle>
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
                    <TableHead>Nombre del Cliente</TableHead>
                    <TableHead>Dirección</TableHead>
                    <TableHead>Tipo de Cliente</TableHead>
                    <TableHead>Celular</TableHead>
                    <TableHead>Tel Casa</TableHead>
                    <TableHead>Correo Electrónico</TableHead>
                    <TableHead>Municipio</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Fecha Regreso</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell className="font-medium">
                        {client.name} {client.lastName}
                      </TableCell>
                      <TableCell>{client.address}</TableCell>
                      <TableCell>
                        <Badge variant={client.clientType === 'Viajero' ? 'default' : 'secondary'}>
                          {client.clientType}
                        </Badge>
                      </TableCell>
                      <TableCell>{client.phone}</TableCell>
                      <TableCell>{client.homePhone}</TableCell>
                      <TableCell>{client.email}</TableCell>
                      <TableCell>{client.city}</TableCell>
                      <TableCell>{client.state}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          {client.registrationDate}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(client)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-gray-600">
                  Registros Totales {filteredClients.length} Registros mostrados (1 - {Math.min(10, filteredClients.length)})
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">← Anterior</Button>
                  <Button variant="default" size="sm">1</Button>
                  <Button variant="outline" size="sm">2</Button>
                  <Button variant="outline" size="sm">3</Button>
                  <Button variant="outline" size="sm">Siguiente →</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Client Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingClient ? 'Editar Cliente' : 'Nuevo Cliente'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nombre del Cliente</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Nombre"
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Apellidos</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  placeholder="Apellidos"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="clientType">Tipo de Cliente</Label>
              <Select value={formData.clientType} onValueChange={(value) => setFormData({...formData, clientType: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Viajero">Viajero</SelectItem>
                  <SelectItem value="Organizador">Organizador</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="address">Dirección</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                placeholder="Dirección"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">Ciudad/Municipio</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  placeholder="Ciudad/Municipio"
                />
              </div>
              <div>
                <Label htmlFor="state">Estado</Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) => setFormData({...formData, state: e.target.value})}
                  placeholder="Estado"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Teléfono Celular</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="Teléfono Celular"
                />
              </div>
              <div>
                <Label htmlFor="homePhone">Teléfono Casa</Label>
                <Input
                  id="homePhone"
                  value={formData.homePhone}
                  onChange={(e) => setFormData({...formData, homePhone: e.target.value})}
                  placeholder="Teléfono Casa"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="Correo Electrónico"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">
                {editingClient ? 'Actualizar' : 'Guardar'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}