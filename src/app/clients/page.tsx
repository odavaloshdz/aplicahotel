"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, UserPlus, Search } from "lucide-react";
import ClientForm from "@/components/clients/ClientForm";

export default function ClientsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock client data
  const clients = [
    {
      id: 1,
      name: "Adelina Pasero",
      type: "Viajero",
      phone: "4271522904",
      email: "",
      city: "Queretaro",
      state: "Queretaro",
      lastVisit: "30 Abril",
    },
    {
      id: 2,
      name: "Agustín Barboa Rangel",
      type: "Viajero",
      phone: "8116803037",
      email: "",
      city: "Monterrey",
      state: "Nuevo Leon",
      lastVisit: "Sin Fecha de Regreso",
    },
    {
      id: 3,
      name: "Agustín Martines",
      type: "Organizador",
      phone: "5529950443",
      email: "",
      city: "Mexico",
      state: "Mexico",
      lastVisit: "30 Mayo",
    },
    {
      id: 4,
      name: "Albertano Sanches",
      type: "Viajero",
      phone: "4191168642",
      email: "",
      city: "Queretaro",
      state: "Queretaro",
      lastVisit: "25 Febrero",
    },
    {
      id: 5,
      name: "Alberto del Bosque",
      type: "Viajero",
      phone: "8771400714",
      email: "",
      city: "Texas",
      state: "Estados Unidos",
      lastVisit: "25 Diciembre",
    },
  ];

  const handleEditClient = (client: any) => {
    setEditingClient(client);
    setIsFormOpen(true);
  };

  const handleAddClient = () => {
    setEditingClient(null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingClient(null);
  };

  return (
    <div className="bg-background min-h-screen p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Clientes</h1>
        <Button onClick={handleAddClient} className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          Nuevo Cliente
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Lista Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Select defaultValue="10">
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Registros" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 Registros</SelectItem>
                  <SelectItem value="25">25 Registros</SelectItem>
                  <SelectItem value="50">50 Registros</SelectItem>
                  <SelectItem value="100">100 Registros</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-muted-foreground">
                Registros por página
              </span>
            </div>

            <div className="relative w-full md:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar..."
                className="pl-8 w-full md:w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre del Cliente</TableHead>
                  <TableHead>Tipo de Cliente</TableHead>
                  <TableHead>Dirección</TableHead>
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
                {clients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className="font-medium">{client.name}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          client.type === "Viajero" ? "default" : "secondary"
                        }
                        className="bg-green-500 hover:bg-green-600"
                      >
                        {client.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{client.city}</TableCell>
                    <TableCell>{client.phone}</TableCell>
                    <TableCell></TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell>{client.city}</TableCell>
                    <TableCell>{client.state}</TableCell>
                    <TableCell>{client.lastVisit}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0 text-blue-500"
                          onClick={() => handleEditClient(client)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Registros Totales: {clients.length} Registros mostrados (1 -{" "}
              {clients.length})
            </p>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">4</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">5</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {editingClient ? "Editar Cliente" : "Nuevo Cliente"}
            </DialogTitle>
          </DialogHeader>
          <ClientForm client={editingClient} onClose={handleCloseForm} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
