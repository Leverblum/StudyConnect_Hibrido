# 🚀 Guía de Instalación y Uso - StudyConnect Refactorizado

## Requisitos Previos

- Node.js 16+ y npm
- Expo CLI instalado: `npm install -g expo-cli`
- React Native development environment configurado
- Backend StudyConnect corriendo en `http://localhost:3000`

## Instalación

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar el servidor de desarrollo
npm start

# 3. Ejecutar en Android/iOS/Web
npm run android    # Android Emulator
npm run ios        # iOS Simulator
npm run web        # Web browser
```

## Configuración Inicial

### Backend API URL

Verificar que en `services/api.ts` está configurada la URL correcta:

```typescript
const API_URL = "http://localhost:3000/api"; // Cambiar si es diferente
```

Si usas un dispositivo físico en lugar de emulador:

```typescript
const API_URL = "http://192.168.X.X:3000/api"; // Tu IP local
```

### AsyncStorage

La aplicación guarda automáticamente:

- `auth_token` - Token JWT del usuario
- `auth_user` - Datos del usuario

No requiere configuración adicional.

## Flujo de Uso

### 1. Autenticación

#### Login

```
1. Inicia la app → Verá pantalla de Login
2. Ingresa email y contraseña
3. Presiona "Iniciar Sesión"
4. Si es exitoso → Navega a Home
5. Token se guarda en AsyncStorage automáticamente
```

#### Registro

```
1. En Login → Presiona "Crear Cuenta"
2. Completa: Nombre, Email, Contraseña, Confirmar Contraseña
3. Presiona "Registrarse"
4. Si es exitoso → Vuelve a Login
5. Inicia sesión con las nuevas credenciales
```

#### Logout

```
1. En cualquier pantalla (tabs) → Presiona ícono 🚪 en Header
2. Confirma en el Alert
3. Vuelve a Login
4. AsyncStorage se limpia automáticamente
```

### 2. Gestión de Materias

#### Ver Materias

```
1. Tab "Materias"
2. Se muestran todas las materias del usuario
3. Pull-to-refresh para actualizar
```

#### Crear Materia

```
1. Tab "Materias"
2. Completa: Nombre y Selecciona un color
3. Presiona "Agregar Materia"
```

#### Eliminar Materia

```
1. En la materia → Presiona "Eliminar"
2. Confirma en el Alert
```

### 3. Gestión de Actividades

#### Ver Actividades

```
1. Tab "Actividades"
2. Filtra por: Pendientes, Completadas, Todas
3. Se muestran ordenadas por fecha de vencimiento
4. Pull-to-refresh para actualizar
```

#### Crear Actividad

```
1. Tab "Actividades"
2. Completa:
   - Título
   - Materia (seleccionar con Chip)
   - Prioridad (Alta, Media, Baja)
3. Presiona "Agregar Actividad"
4. Se crea con vencimiento para mañana
```

#### Completar/Marcar Actividad

```
1. En la actividad → Presiona el ícono ○/✔
2. Se marca como completada
3. Se delinea el texto
```

#### Eliminar Actividad

```
1. En la actividad → Presiona 🗑️
2. Se elimina inmediatamente (sin confirmación por velocidad)
```

### 4. Calendario de Eventos

#### Ver Eventos

```
1. Tab "Calendario"
2. Se muestran agrupados por fecha
3. Cada evento muestra:
   - Título
   - Materia
   - Hora (si aplica)
   - Ubicación (si aplica)
   - Descripción (si aplica)
   - Tipo (Examen, Clase, Reunión, Evento)
4. Pull-to-refresh para actualizar
```

#### Crear Evento

```
Nota: La creación de eventos no está en UI (futura mejora)
Puedes crearlos directamente en el backend
```

### 5. Dashboard Home

```
1. Tab "Inicio"
2. Muestra:
   - Total de materias
   - Total de actividades vencidas
   - Total de actividades completadas hoy
   - Próximas 3 entregas
   - Listado de materias
3. Pull-to-refresh para actualizar
```

## Estructura de Datos Esperada del Backend

### Endpoint: POST /users/login

**Request:**

```json
{
  "email": "usuario@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "user": {
    "id": "1",
    "name": "Juan Pérez",
    "email": "usuario@example.com",
    "createdAt": "2024-01-15T10:30:00Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Endpoint: POST /users/register

**Request:**

```json
{
  "name": "Juan Pérez",
  "email": "usuario@example.com",
  "password": "password123"
}
```

**Response:** (igual a login)

### Endpoint: GET /subjects

**Headers:** `Authorization: Bearer {token}`

**Response:**

```json
[
  {
    "id": "1",
    "name": "Cálculo",
    "color": "#6366F1",
    "userId": "1",
    "createdAt": "2024-01-15T10:30:00Z"
  }
]
```

### Endpoint: GET /activities

**Headers:** `Authorization: Bearer {token}`

**Response:**

```json
[
  {
    "id": "1",
    "title": "Resolver ejercicios 1-20",
    "description": "Del capítulo 5",
    "subjectId": "1",
    "dueDate": "2024-01-20T23:59:59Z",
    "completed": false,
    "priority": "high",
    "userId": "1",
    "createdAt": "2024-01-15T10:30:00Z"
  }
]
```

### Endpoint: GET /events

**Headers:** `Authorization: Bearer {token}`

**Response:**

```json
[
  {
    "id": "1",
    "title": "Examen Final",
    "description": "Temas 1-8",
    "subjectId": "1",
    "date": "2024-01-25T10:00:00Z",
    "time": "10:00 AM",
    "location": "Sala 101",
    "eventType": "exam",
    "userId": "1",
    "createdAt": "2024-01-15T10:30:00Z"
  }
]
```

## Solución de Problemas

### La app no se conecta al backend

```
Error: Network Error / Cannot reach server

Soluciones:
1. Verifica que el backend está corriendo: http://localhost:3000
2. Si usas emulador: Cambia "localhost" por "10.0.2.2"
3. Si usas dispositivo físico: Usa tu IP local (192.168.X.X)
4. Verifica CORS en el backend
5. Abre DevTools: npm start → Presiona "d"
```

### El Token no se guarda

```
Error: En cada refresh, requiere login de nuevo

Soluciones:
1. Verifica AsyncStorage está funcionando
2. Revisa que AuthContext.tsx tiene los nombres correctos:
   - STORAGE_TOKEN_KEY = "auth_token"
   - STORAGE_USER_KEY = "auth_user"
3. En Android: Puede ser problema de permisos
```

### Las actividades no se muestran

```
Error: Lista vacía en Actividades

Soluciones:
1. Crea primero una materia
2. Crea una actividad vinculada a esa materia
3. Verifica endpoint GET /activities en tu backend
4. Abre DevTools y revisa logs
```

### Error de validación en Login

```
Error: "Email válido requerido" o "La contraseña debe tener al menos 6 caracteres"

Soluciones:
1. Ingresa un email con formato válido: user@example.com
2. Contraseña mínimo 6 caracteres
3. Ambos campos son obligatorios
```

## Debugging

### Ver Logs en Development

```bash
# Terminal
npm start

# En la app, presiona "d"
# Selecciona "Open Debugger" para DevTools
# O usa: npm run android -- --verbose
```

### Network Inspector

En DevTools, abre "Network" para ver todas las llamadas HTTP:

- Request/Response headers
- Body de requests
- Status code

### React DevTools

```bash
npm install -g react-devtools
react-devtools

# Abre en http://localhost:8097
```

## Optimizaciones Recomendadas

1. **Caché de datos**: Los hooks ya tienen estado local, pero puedes agregar persistencia en AsyncStorage
2. **Pagination**: En listas grandes (> 100 items), implementar pagination
3. **Image optimization**: Si agregas imágenes, usar `expo-image`
4. **Splash screen**: Ya está configurada en app.json
5. **Push notifications**: Usar `expo-notifications`

## Próximos Pasos

1. Implementar Tests
2. Agregar more endpoints
3. Dark mode
4. Internacionalización
5. Analytics

---

**¡Listo para desarrollar! 🚀**
