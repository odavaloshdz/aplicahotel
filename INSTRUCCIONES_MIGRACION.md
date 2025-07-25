# Instrucciones para ejecutar las migraciones en Supabase

Para que el sistema AplicaHotel funcione correctamente, necesitas crear las tablas y configuraciones necesarias en tu base de datos Supabase. Sigue estos pasos:

## 1. Accede a tu proyecto de Supabase

1. Ve a [https://app.supabase.io/](https://app.supabase.io/) e inicia sesión
2. Selecciona tu proyecto (URL: https://ewmwniyxjwthcrrtwpqi.supabase.co)

## 2. Ejecuta las migraciones SQL

1. En el panel lateral izquierdo, haz clic en "SQL Editor"
2. Haz clic en "+ New Query"
3. Copia y pega todo el contenido del archivo `supabase_migrations.sql` que se encuentra en la raíz de este proyecto
4. Haz clic en "Run" para ejecutar todas las consultas

## 3. Crea un usuario administrador

1. En el panel lateral izquierdo, haz clic en "Authentication" y luego en "Users"
2. Haz clic en "+ Add User"
3. Completa los campos:
   - Email: admin@aplicahotel.com (o el que prefieras)
   - Password: Admin123! (o una contraseña segura)
4. Haz clic en "Create User"

## 4. Asigna el rol de administrador al usuario

1. Copia el ID del usuario que acabas de crear (aparece en la lista de usuarios)
2. Ve a "SQL Editor" nuevamente
3. Crea una nueva consulta con el siguiente contenido (reemplaza `ID_DEL_USUARIO_AUTH` con el ID real):

```sql
INSERT INTO public.users (id, email, full_name, role)
VALUES ('ID_DEL_USUARIO_AUTH', 'admin@aplicahotel.com', 'Administrador', 'admin');
```

4. Haz clic en "Run" para ejecutar la consulta

## 5. Verifica la configuración

1. Ve a "Table Editor" en el panel lateral
2. Deberías ver las siguientes tablas:
   - users
   - clients
   - rooms
   - reservations
3. Verifica que cada tabla tenga los campos correctos según la definición en el archivo `supabase.ts`

## 6. Inicia sesión en la aplicación

Ahora puedes iniciar sesión en la aplicación AplicaHotel usando las credenciales del usuario administrador que creaste:

- URL: http://localhost:3000
- Email: admin@aplicahotel.com (o el que hayas usado)
- Contraseña: Admin123! (o la que hayas usado)

¡Listo! El sistema AplicaHotel debería estar funcionando correctamente con tu base de datos Supabase.