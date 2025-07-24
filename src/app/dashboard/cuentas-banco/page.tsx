'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Plus, Edit, Trash2, CreditCard } from 'lucide-react'

// Mock data
const mockAccounts = [
  {
    id: '1',
    bankName: 'bancomer',
    accountNumber: '2147483647',
    ownerName: 'lorenzo'
  }
]

export default function CuentasBancoPage() {
  const [accounts, setAccounts] = useState(mockAccounts)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    bankName: '',
    ownerName: '',
    accountNumber: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newAccount = {
      id: Date.now().toString(),
      ...formData
    }
    setAccounts([...accounts, newAccount])
    setIsDialogOpen(false)
    setFormData({ bankName: '', ownerName: '', accountNumber: '' })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Cuentas de Banco</h1>
        <p className="text-gray-600">Gestión de cuentas bancarias</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* New Account Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="mr-2 h-4 w-4" />
              Nueva Cuenta de Banco
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="bankName">Nombre del Banco</Label>
              <Input id="bankName" placeholder="Nombre del banco" />
            </div>
            <div>
              <Label htmlFor="ownerName">Nombre del Propietario</Label>
              <Input id="ownerName" placeholder="Propietario" />
            </div>
            <div>
              <Label htmlFor="accountNumber">Numero de Cuenta</Label>
              <Input id="accountNumber" placeholder="Número de cuenta" />
            </div>
            <Button onClick={() => setIsDialogOpen(true)} className="w-full">
              Guardar
            </Button>
          </CardContent>
        </Card>

        {/* Account List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Lista de Cuentas de Banco</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre del Banco</TableHead>
                    <TableHead>Numero de Cuenta</TableHead>
                    <TableHead>Nombre del Propietario</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {accounts.map((account) => (
                    <TableRow key={account.id}>
                      <TableCell>{account.bankName}</TableCell>
                      <TableCell>{account.accountNumber}</TableCell>
                      <TableCell>{account.ownerName}</TableCell>
                      <TableCell>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nueva Cuenta de Banco</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="bankName">Nombre del Banco</Label>
              <Input
                id="bankName"
                value={formData.bankName}
                onChange={(e) => setFormData({...formData, bankName: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="ownerName">Nombre del Propietario</Label>
              <Input
                id="ownerName"
                value={formData.ownerName}
                onChange={(e) => setFormData({...formData, ownerName: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="accountNumber">Numero de Cuenta</Label>
              <Input
                id="accountNumber"
                value={formData.accountNumber}
                onChange={(e) => setFormData({...formData, accountNumber: e.target.value})}
                required
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