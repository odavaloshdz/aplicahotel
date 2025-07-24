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
import { UserCheck, Plus, Edit, Trash2 } from 'lucide-react'

// Mock data
const mockEmployees = [
  {
    id: '1',
    employeeId: 'emt001',
    name: 'Lorenzo Romo',
    lastName: 'Lorenzo',
    address: 'Juarez #162',
    phone: '3951006153',
    role: 'Administrador de Sistema',
    workplace: 'Hotel San Lorenzo',
    email: 'lorenzo20@hotmail.com',
    contractDate: '1998-05-03 23:41:05',
    status: 'Activo'
  }
]

export default function EmpleadosPage() {
  const [employees, setEmployees] = useState(mockEmployees)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    employeeId: '',
    name: '',
    lastName: '',
    address: '',
    phone: '',
    role: '',
    workplace: '',
    email: '',
    password: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newEmployee = {
      id: Date.now().toString(),
      ...formData,
      contractDate: new Date().toISOString(),
      status: 'Activo'
    }
    setEmployees([...employees, newEmployee])
    setIsDialogOpen(false)
    setFormData({
      employeeId: '',
      name: '',
      lastName: '',
      address: '',
      phone: '',
      role: '',
      workplace: '',
      email: '',
      password: ''
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Empleados</h1>
        <p className="text-gray-600">Gestión de empleados del hotel</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* New Employee Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserCheck className="mr-2 h-4 w-4" />
              Insertar Empleado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setIsDialogOpen(true)} className="w-full">
              Agregar Nuevo Empleado
            </Button>
          </CardContent>
        </Card>

        {/* Employee List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Lista de Empleados</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID del Empleado</TableHead>
                    <TableHead>Nombre del Empleado</TableHead>
                    <TableHead>Nombre Preferido</TableHead>
                    <TableHead>Dirección</TableHead>
                    <TableHead>Teléfono</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>Lugar de Trabajo</TableHead>
                    <TableHead>Correo Electrónico</TableHead>
                    <TableHead>Fecha de Contratación</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>{employee.employeeId}</TableCell>
                      <TableCell>{employee.name}</TableCell>
                      <TableCell>{employee.lastName}</TableCell>
                      <TableCell>{employee.address}</TableCell>
                      <TableCell>{employee.phone}</TableCell>
                      <TableCell>{employee.role}</TableCell>
                      <TableCell>{employee.workplace}</TableCell>
                      <TableCell>{employee.email}</TableCell>
                      <TableCell>{new Date(employee.contractDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" className="text-blue-600">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Badge className="bg-blue-100 text-blue-800">Activo</Badge>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Employee Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Insertar Empleado</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="employeeId">ID de Empleado</Label>
              <Input
                id="employeeId"
                value={formData.employeeId}
                onChange={(e) => setFormData({...formData, employeeId: e.target.value})}
                placeholder="emt002"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nombre del Empleado</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Nombre"
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Apellido</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  placeholder="Apellido"
                  required
                />
              </div>
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

            <div>
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="Teléfono"
              />
            </div>

            <div>
              <Label htmlFor="role">Rol</Label>
              <Select value={formData.role} onValueChange={(value) => setFormData({...formData, role: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Administrador de Sistema">Administrador de Sistema</SelectItem>
                  <SelectItem value="Gerente">Gerente</SelectItem>
                  <SelectItem value="Recepcionista">Recepcionista</SelectItem>
                  <SelectItem value="Limpieza">Limpieza</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="workplace">Lugar de Trabajo</Label>
              <Select value={formData.workplace} onValueChange={(value) => setFormData({...formData, workplace: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar lugar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Hotel San Lorenzo">Hotel San Lorenzo</SelectItem>
                  <SelectItem value="Sucursal Centro">Sucursal Centro</SelectItem>
                </SelectContent>
              </Select>
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

            <div>
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="Contraseña"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">Guardar</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}