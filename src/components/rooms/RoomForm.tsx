"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface RoomFormProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSubmit?: (data: RoomData) => void;
  initialData?: RoomData;
  isEditing?: boolean;
}

interface RoomData {
  id?: string;
  number: string;
  type: string;
  rate: string;
  description: string;
  status: string;
  packageType: string;
}

const RoomForm = ({
  isOpen = true,
  onClose = () => {},
  onSubmit = () => {},
  initialData = {
    number: "",
    type: "double",
    rate: "550.00",
    description: "INDIVIDUAL Y MATRIMONIAL",
    status: "available",
    packageType: "basic",
  },
  isEditing = false,
}: RoomFormProps) => {
  const [formData, setFormData] = useState<RoomData>(initialData);

  const handleChange = (field: keyof RoomData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const title = isEditing ? "Editar Habitación" : "Nueva Habitación";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-background">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="number">Nombre de Habitación</Label>
              <Input
                id="number"
                value={formData.number}
                onChange={(e) => handleChange("number", e.target.value)}
                placeholder="101"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Tipo de Habitación</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleChange("type", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Individual</SelectItem>
                  <SelectItem value="double">Doble</SelectItem>
                  <SelectItem value="matrimonial">Matrimonial</SelectItem>
                  <SelectItem value="suite">Suite</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rate">Tarifa</Label>
              <Select
                value={formData.rate}
                onValueChange={(value) => handleChange("rate", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tarifa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="450.00">$450.00</SelectItem>
                  <SelectItem value="550.00">$550.00</SelectItem>
                  <SelectItem value="650.00">$650.00</SelectItem>
                  <SelectItem value="750.00">$750.00</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="packageType">Paquete Ingreso</Label>
              <Select
                value={formData.packageType}
                onValueChange={(value) => handleChange("packageType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar paquete" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Paquete Base</SelectItem>
                  <SelectItem value="premium">Paquete Premium</SelectItem>
                  <SelectItem value="deluxe">Paquete Deluxe</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Descripción de la habitación"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Estado</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleChange("status", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Disponible</SelectItem>
                  <SelectItem value="occupied">Ocupada</SelectItem>
                  <SelectItem value="maintenance">Mantenimiento</SelectItem>
                  <SelectItem value="reserved">Reservada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              {isEditing ? "Actualizar" : "Guardar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RoomForm;
