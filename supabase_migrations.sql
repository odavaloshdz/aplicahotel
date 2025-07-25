-- Migraciones para Supabase

-- Tabla de usuarios (esta tabla ya existe en Supabase Auth, pero necesitamos agregar campos personalizados)
-- Nota: Los usuarios se crean automáticamente en auth.users cuando se registran
-- Esta tabla es para almacenar información adicional

CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT CHECK (role IN ('admin', 'manager', 'front_desk')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Configurar RLS (Row Level Security) para la tabla users
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Políticas para users
CREATE POLICY "Los usuarios pueden ver sus propios datos" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Los administradores pueden ver todos los usuarios" ON public.users
  FOR SELECT USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Los administradores pueden actualizar usuarios" ON public.users
  FOR UPDATE USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

-- Tabla de clientes
CREATE TABLE IF NOT EXISTS public.clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  client_type TEXT CHECK (client_type IN ('Viajero', 'Organizador')),
  address TEXT,
  city TEXT,
  state TEXT,
  phone TEXT,
  home_phone TEXT,
  email TEXT,
  registration_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Configurar RLS para la tabla clients
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

-- Políticas para clients
CREATE POLICY "Los usuarios autenticados pueden ver clientes" ON public.clients
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Los usuarios autenticados pueden crear clientes" ON public.clients
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Los usuarios autenticados pueden actualizar clientes" ON public.clients
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Tabla de habitaciones
CREATE TABLE IF NOT EXISTS public.rooms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  room_number TEXT NOT NULL UNIQUE,
  room_type TEXT CHECK (room_type IN ('Doble', 'Matrimonial', 'Sencilla')),
  rate DECIMAL(10, 2) NOT NULL,
  package_id UUID,
  description TEXT,
  status TEXT CHECK (status IN ('Disponible', 'Ocupada', 'Mantenimiento')) DEFAULT 'Disponible',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Configurar RLS para la tabla rooms
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;

-- Políticas para rooms
CREATE POLICY "Los usuarios autenticados pueden ver habitaciones" ON public.rooms
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Los administradores pueden crear habitaciones" ON public.rooms
  FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Los administradores pueden actualizar habitaciones" ON public.rooms
  FOR UPDATE USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

-- Tabla de reservaciones
CREATE TABLE IF NOT EXISTS public.reservations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ticket_number TEXT NOT NULL UNIQUE,
  client_id UUID NOT NULL REFERENCES public.clients(id),
  room_ids UUID[] NOT NULL,
  check_in TIMESTAMP WITH TIME ZONE NOT NULL,
  check_out TIMESTAMP WITH TIME ZONE NOT NULL,
  total_nights INTEGER NOT NULL,
  rate_per_night DECIMAL(10, 2) NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  amount_received DECIMAL(10, 2) DEFAULT 0,
  status TEXT CHECK (status IN ('Activa', 'Completada', 'Cancelada')) DEFAULT 'Activa',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Configurar RLS para la tabla reservations
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

-- Políticas para reservations
CREATE POLICY "Los usuarios autenticados pueden ver reservaciones" ON public.reservations
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Los usuarios autenticados pueden crear reservaciones" ON public.reservations
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Los usuarios autenticados pueden actualizar reservaciones" ON public.reservations
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Función para actualizar el campo updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para actualizar updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_clients_updated_at
  BEFORE UPDATE ON public.clients
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_rooms_updated_at
  BEFORE UPDATE ON public.rooms
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_reservations_updated_at
  BEFORE UPDATE ON public.reservations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Datos de ejemplo para pruebas

-- Insertar un usuario administrador (primero debe crearse en auth.users)
-- INSERT INTO public.users (id, email, full_name, role)
-- VALUES ('ID_DEL_USUARIO_AUTH', 'admin@aplicahotel.com', 'Administrador', 'admin');

-- Insertar algunos clientes de ejemplo
INSERT INTO public.clients (name, last_name, client_type, phone, email)
VALUES 
  ('Juan', 'Pérez', 'Viajero', '555-1234', 'juan@example.com'),
  ('María', 'González', 'Organizador', '555-5678', 'maria@example.com'),
  ('Carlos', 'Rodríguez', 'Viajero', '555-9012', 'carlos@example.com');

-- Insertar algunas habitaciones de ejemplo
INSERT INTO public.rooms (room_number, room_type, rate, description)
VALUES 
  ('101', 'Sencilla', 800, 'Habitación sencilla con vista al jardín'),
  ('102', 'Doble', 1200, 'Habitación doble con vista a la piscina'),
  ('201', 'Matrimonial', 1500, 'Habitación matrimonial con balcón');