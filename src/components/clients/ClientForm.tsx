"use client";

import { useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const clientSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  apellidos: z.string().min(1, "Los apellidos son requeridos"),
  tipoCliente: z.string().min(1, "El tipo de cliente es requerido"),
  direccion: z.string().optional(),
  ciudad: z.string().optional(),
  estado: z.string().optional(),
  telefonoCelular: z.string().optional(),
  telefonoCasa: z.string().optional(),
  correoElectronico: z
    .string()
    .email("Correo electrónico inválido")
    .optional()
    .or(z.literal("")),
});

type ClientFormValues = z.infer<typeof clientSchema>;

interface ClientFormProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSubmit?: (data: ClientFormValues) => void;
  initialData?: Partial<ClientFormValues>;
  isDialog?: boolean;
}

export default function ClientForm({
  isOpen = true,
  onClose = () => {},
  onSubmit,
  initialData = {},
  isDialog = true,
}: ClientFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      nombre: initialData.nombre || "",
      apellidos: initialData.apellidos || "",
      tipoCliente: initialData.tipoCliente || "",
      direccion: initialData.direccion || "",
      ciudad: initialData.ciudad || "",
      estado: initialData.estado || "",
      telefonoCelular: initialData.telefonoCelular || "",
      telefonoCasa: initialData.telefonoCasa || "",
      correoElectronico: initialData.correoElectronico || "",
    },
  });

  const handleSubmit = async (data: ClientFormValues) => {
    setIsSubmitting(true);
    try {
      if (onSubmit) {
        await onSubmit(data);
      }
      if (isDialog) {
        onClose();
      }
    } catch (error) {
      console.error("Error al guardar el cliente:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formContent = (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 bg-background"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="nombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre del Cliente</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="apellidos"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apellidos</FormLabel>
                <FormControl>
                  <Input placeholder="Apellidos" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="tipoCliente"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Cliente</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo de cliente" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="visitante">Visitante</SelectItem>
                  <SelectItem value="frecuente">Frecuente</SelectItem>
                  <SelectItem value="corporativo">Corporativo</SelectItem>
                  <SelectItem value="organizador">Organizador</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="direccion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dirección</FormLabel>
              <FormControl>
                <Input placeholder="Dirección" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="ciudad"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ciudad/Municipio</FormLabel>
                <FormControl>
                  <Input placeholder="Ciudad/Municipio" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="estado"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <FormControl>
                  <Input placeholder="Estado" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="telefonoCelular"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono Celular</FormLabel>
                <FormControl>
                  <Input placeholder="Teléfono Celular" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="telefonoCasa"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono Casa</FormLabel>
                <FormControl>
                  <Input placeholder="Teléfono Casa" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="correoElectronico"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo Electrónico</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Correo Electrónico"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!isDialog && (
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Guardando..." : "Guardar"}
            </Button>
          </div>
        )}
      </form>
    </Form>
  );

  if (isDialog) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {initialData.nombre ? "Editar Cliente" : "Nuevo Cliente"}
            </DialogTitle>
          </DialogHeader>
          {formContent}
          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              onClick={form.handleSubmit(handleSubmit)}
            >
              {isSubmitting ? "Guardando..." : "Guardar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Card className="w-full bg-background">
      <CardHeader>
        <CardTitle>
          {initialData.nombre ? "Editar Cliente" : "Nuevo Cliente"}
        </CardTitle>
      </CardHeader>
      <CardContent>{formContent}</CardContent>
    </Card>
  );
}
