import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string
          role: 'admin' | 'manager' | 'front_desk'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          full_name: string
          role?: 'admin' | 'manager' | 'front_desk'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          role?: 'admin' | 'manager' | 'front_desk'
          created_at?: string
          updated_at?: string
        }
      }
      clients: {
        Row: {
          id: string
          name: string
          last_name: string
          client_type: 'Viajero' | 'Organizador'
          address: string
          city: string
          state: string
          phone: string
          home_phone: string
          email: string
          registration_date: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          last_name: string
          client_type?: 'Viajero' | 'Organizador'
          address?: string
          city?: string
          state?: string
          phone?: string
          home_phone?: string
          email?: string
          registration_date?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          last_name?: string
          client_type?: 'Viajero' | 'Organizador'
          address?: string
          city?: string
          state?: string
          phone?: string
          home_phone?: string
          email?: string
          registration_date?: string
          created_at?: string
          updated_at?: string
        }
      }
      rooms: {
        Row: {
          id: string
          room_number: string
          room_type: 'Doble' | 'Matrimonial' | 'Sencilla'
          rate: number
          package_id: string | null
          description: string
          status: 'Disponible' | 'Ocupada' | 'Mantenimiento'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          room_number: string
          room_type: 'Doble' | 'Matrimonial' | 'Sencilla'
          rate: number
          package_id?: string | null
          description?: string
          status?: 'Disponible' | 'Ocupada' | 'Mantenimiento'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          room_number?: string
          room_type?: 'Doble' | 'Matrimonial' | 'Sencilla'
          rate?: number
          package_id?: string | null
          description?: string
          status?: 'Disponible' | 'Ocupada' | 'Mantenimiento'
          created_at?: string
          updated_at?: string
        }
      }
      reservations: {
        Row: {
          id: string
          ticket_number: string
          client_id: string
          room_ids: string[]
          check_in: string
          check_out: string
          total_nights: number
          rate_per_night: number
          total_amount: number
          amount_received: number
          status: 'Activa' | 'Completada' | 'Cancelada'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          ticket_number: string
          client_id: string
          room_ids: string[]
          check_in: string
          check_out: string
          total_nights: number
          rate_per_night: number
          total_amount: number
          amount_received?: number
          status?: 'Activa' | 'Completada' | 'Cancelada'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          ticket_number?: string
          client_id?: string
          room_ids?: string[]
          check_in?: string
          check_out?: string
          total_nights?: number
          rate_per_night?: number
          total_amount?: number
          amount_received?: number
          status?: 'Activa' | 'Completada' | 'Cancelada'
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}