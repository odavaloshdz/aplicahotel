"use client";

import React, { useState } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Plus, Search } from "lucide-react";
import RoomForm from "@/components/rooms/RoomForm";

export default function RoomsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roomTypeFilter, setRoomTypeFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("");
  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);
  const [isEditRoomOpen, setIsEditRoomOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Mock data for rooms
  const rooms = [
    {
      id: "101",
      type: "Doble",
      description: "INDIVIDUAL Y MATRIMONIAL",
      rate: "$550.00",
      status: "Disponible",
    },
    {
      id: "102",
      type: "Doble",
      description: "MATRIMONIALES",
      rate: "$550.00",
      status: "Disponible",
    },
    {
      id: "103",
      type: "Doble",
      description: "MATRIMONIALES",
      rate: "$550.00",
      status: "Disponible",
    },
    {
      id: "104",
      type: "Doble",
      description: "Matrimonial",
      rate: "$550.00",
      status: "Disponible",
    },
    {
      id: "201",
      type: "Doble",
      description: "MATRIMONIALES",
      rate: "$550.00",
      status: "Disponible",
    },
    {
      id: "202",
      type: "Doble",
      description: "MATRIMONIALES",
      rate: "$550.00",
      status: "Disponible",
    },
    {
      id: "203",
      type: "Doble",
      description: "MATRIMONIAL",
      rate: "$550.00",
      status: "Disponible",
    },
    {
      id: "204",
      type: "Secilla",
      description: "MATRIMONIALES",
      rate: "$550.00",
      status: "Disponible",
    },
  ];

  const handleEditRoom = (room: any) => {
    setSelectedRoom(room);
    setIsEditRoomOpen(true);
  };

  const handleAddNewRoom = () => {
    setSelectedRoom(null);
    setIsAddRoomOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddRoomOpen(false);
    setIsEditRoomOpen(false);
  };

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = roomTypeFilter ? room.type === roomTypeFilter : true;
    const matchesAvailability = availabilityFilter
      ? room.status === availabilityFilter
      : true;

    return matchesSearch && matchesType && matchesAvailability;
  });

  return (
    <div className="bg-background min-h-screen p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Habitaciones</h1>
        <Button onClick={handleAddNewRoom} className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Nueva Habitación
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Total de Habitaciones: {rooms.length}</CardTitle>
        </CardHeader>
      </Card>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={roomTypeFilter} onValueChange={setRoomTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Tipo de Habitación" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todos</SelectItem>
            <SelectItem value="Doble">Doble</SelectItem>
            <SelectItem value="Secilla">Sencilla</SelectItem>
            <SelectItem value="Suite">Suite</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={availabilityFilter}
          onValueChange={setAvailabilityFilter}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todos</SelectItem>
            <SelectItem value="Disponible">Disponible</SelectItem>
            <SelectItem value="Ocupado">Ocupado</SelectItem>
            <SelectItem value="Mantenimiento">Mantenimiento</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
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
                  <TableCell>{room.id}</TableCell>
                  <TableCell>{room.type}</TableCell>
                  <TableCell>{room.description}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`${room.status === "Disponible" ? "bg-green-100 text-green-800 border-green-300" : "bg-red-100 text-red-800 border-red-300"}`}
                    >
                      {room.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditRoom(room)}
                      >
                        <Pencil className="h-4 w-4 text-blue-500" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Registros Totales: {rooms.length} Registros mostrados (1 - 10)
        </div>
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
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {/* Add Room Modal */}
      <Dialog open={isAddRoomOpen} onOpenChange={setIsAddRoomOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Nueva Habitación</DialogTitle>
          </DialogHeader>
          <RoomForm onClose={handleCloseModal} />
        </DialogContent>
      </Dialog>

      {/* Edit Room Modal */}
      <Dialog open={isEditRoomOpen} onOpenChange={setIsEditRoomOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Editar Habitación</DialogTitle>
          </DialogHeader>
          <RoomForm room={selectedRoom} onClose={handleCloseModal} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
