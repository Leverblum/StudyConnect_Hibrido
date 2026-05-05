# 🏗️ Guía de Arquitectura - StudyConnect

## Resumen Ejecutivo

StudyConnect ha sido **completamente refactorizado** aplicando arquitectura limpia con separación de responsabilidades, componentes reutilizables, y conexión total con el backend.

## 📁 Estructura del Proyecto

```
StudyConnect_Hibrido/
├── app/                          # Pantallas (Expo Router)
│   ├── _layout.tsx               # Configuración de navegación
│   ├── index.tsx                 # Pantalla inicial
│   ├── login.tsx                 # Pantalla de login
│   ├── register.tsx              # Pantalla de registro
│   └── tabs/                     # Navegación con tabs
│       ├── _layout.tsx           # Configuración de tabs
│       ├── home.tsx              # Home (delega a HomePage)
│       ├── subjects.tsx          # Subjects (delega a SubjectsPage)
│       ├── tasks.tsx             # Tasks (delega a ActivitiesPage)
│       └── calendar.tsx          # Calendar (delega a CalendarPage)
│
├── components/                   # Componentes UI PUROS (sin lógica)
│   ├── CustomButton.tsx          # Botón reutilizable (variants, loading, etc)
│   ├── CustomInput.tsx           # Input con label y validación visual
│   ├── Card.tsx                  # Card container
│   ├── Chip.tsx                  # Chip/Tag reutilizable
│   ├── Badge.tsx                 # Badge para estados
│   ├── ListItem.tsx              # Item de lista genérico
│   ├── Header.tsx                # Header mejorado
│   ├── TaskItem.tsx              # Item de actividad
│   ├── LogoutButton.tsx          # Botón logout
│   └── CustomButtonDelete.tsx    # [DEPRECATED] Usar CustomButton
│
├── containers/                   # Custom Hooks con LÓGICA DE NEGOCIO
│   ├── useSubjects.ts            # Lógica de Subjects (CRUD)
│   ├── useActivities.ts          # Lógica de Activities (CRUD)
│   └── useEvents.ts              # Lógica de Events (CRUD)
│
├── pages/                        # Pantallas COMPLETAS (reúnen components + containers)
│   ├── LoginPage.tsx             # Página de Login
│   ├── RegisterPage.tsx          # Página de Registro
│   ├── HomePage.tsx              # Dashboard principal
│   ├── SubjectsPage.tsx          # Gestión de Materias
│   ├── ActivitiesPage.tsx        # Gestión de Actividades/Tareas
│   └── CalendarPage.tsx          # Calendario de Eventos
│
├── context/
│   └── AuthContext.tsx           # Contexto de autenticación global (JWT)
│
├── services/
│   └── api.ts                    # Todas las llamadas HTTP al backend
│
├── types/
│   ├── User.ts                   # Tipos: User, AuthResponse, ApiError
│   ├── Subject.ts                # Tipos: Subject, SubjectWithStats
│   └── Task.ts                   # Tipos: Activity, Event (antes Task)
│
├── styles/
│   └── globalStyles.ts           # Estilos globales + colores modernos
│
└── app.json, package.json, tsconfig.json, etc.
```

## 🎯 Arquitectura por Capas

### 1. **Pages** (Ensamblaje)

- Importan `components` y `containers`
- NO tienen lógica propia
- Renderiza UI + consume hooks
- Ejemplo: `HomePage.tsx`

```typescript
export default function HomePage() {
  const { subjects } = useSubjects();      // Lógica de negocio
  const { activities } = useActivities();   // Lógica de negocio

  return (
    <Header ... />
    <Card>
      <Text>...</Text>
    </Card>
  );
}
```

### 2. **Containers** (Lógica)

- Custom hooks con lógica de negocio
- Consumen `services/api.ts`
- Manejo de estado y errores
- Ejemplo: `useSubjects.ts`

```typescript
export function useSubjects() {
  const { token } = useContext(AuthContext);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const refreshSubjects = useCallback(async () => {
    const data = await getSubjectsRequest(token);
    setSubjects(data);
  }, [token]);

  return { subjects, refreshSubjects, ... };
}
```

### 3. **Components** (UI Pura)

- Componentes visuales reutilizables
- NO consumen API
- Props driven
- Altamente reutilizables

```typescript
interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "danger" | "outline";
  loading?: boolean;
  ...
}

export default function CustomButton({ ... }: CustomButtonProps) {
  return <Pressable>...</Pressable>;
}
```

### 4. **Services** (API)

- Funciones para cada endpoint
- Helpers para headers y autenticación
- Manejo de errores centralizado

```typescript
export const getSubjectsRequest = async (token: string) => {
  const response = await fetch(`${API_URL}/subjects`, {
    headers: getAuthHeaders(token),
  });
  return handleResponse(response);
};
```

### 5. **Types** (TypeScript)

- Interfaces para toda la aplicación
- Mayor seguridad de tipos

```typescript
interface Activity {
  id: string;
  title: string;
  subjectId: string;
  dueDate: string;
  completed: boolean;
  priority?: "low" | "medium" | "high";
}
```

## 🔐 Autenticación & JWT

### Flujo:

1. Usuario hace login en `LoginPage`
2. `AuthContext.login()` llama a `loginRequest()`
3. Backend retorna `{ user, token }`
4. Token guardado en `AsyncStorage`
5. Token enviado en headers: `Authorization: Bearer {token}`
6. Logout limpia `AsyncStorage` y contexto

### Uso:

```typescript
const { token, login, logout, isAuthenticated } = useContext(AuthContext);

// Usar token en containers:
const { token } = useContext(AuthContext);
const response = await getSubjectsRequest(token);
```

## 📡 API Service

### Headers de Autenticación:

```typescript
getAuthHeaders(token); // { "Content-Type": "application/json", "Authorization": "Bearer {token}" }
getPublicHeaders(); // { "Content-Type": "application/json" }
```

### Endpoints Disponibles:

#### Users

- `loginRequest(email, password)` → `POST /users/login`
- `registerRequest(name, email, password)` → `POST /users/register`
- `getUserProfileRequest(token)` → `GET /users/profile`
- `updateUserProfileRequest(token, userData)` → `PUT /users/profile`

#### Subjects

- `getSubjectsRequest(token)` → `GET /subjects`
- `getSubjectRequest(id, token)` → `GET /subjects/{id}`
- `createSubjectRequest(subject, token)` → `POST /subjects`
- `updateSubjectRequest(id, updates, token)` → `PUT /subjects/{id}`
- `deleteSubjectRequest(id, token)` → `DELETE /subjects/{id}`

#### Activities

- `getActivitiesRequest(token)` → `GET /activities`
- `getActivitiesBySubjectRequest(subjectId, token)` → `GET /activities?subjectId={id}`
- `createActivityRequest(activity, token)` → `POST /activities`
- `updateActivityRequest(id, updates, token)` → `PUT /activities/{id}`
- `toggleActivityRequest(id, token)` → `PATCH /activities/{id}/toggle`
- `deleteActivityRequest(id, token)` → `DELETE /activities/{id}`

#### Events

- `getEventsRequest(token)` → `GET /events`
- `getEventsBySubjectRequest(subjectId, token)` → `GET /events?subjectId={id}`
- `getEventsByDateRequest(startDate, endDate, token)` → `GET /events?startDate={}&endDate={}`
- `createEventRequest(event, token)` → `POST /events`
- `updateEventRequest(id, updates, token)` → `PUT /events/{id}`
- `deleteEventRequest(id, token)` → `DELETE /events/{id}`

## 🎨 Diseño Moderno

### Colores:

- **Primary**: Indigo (`#6366F1`)
- **Secondary**: Violet (`#8B5CF6`)
- **Error**: Red (`#EF4444`)
- **Success**: Green (`#10B981`)
- **Warning**: Amber (`#F59E0B`)

### Componentes Disponibles:

- `CustomButton` - variants: primary, secondary, danger, success, outline
- `CustomInput` - con label, error validation, focus state
- `Card` - variants: default, large, compact
- `Chip` - para tags/selección
- `Badge` - para estados
- `ListItem` - para listas
- `Header` - con navigation actions

## 🚀 Cómo Usar

### Crear una Nueva Página:

1. **Crear Container** (`containers/useMyFeature.ts`):

```typescript
export function useMyFeature() {
  const { token } = useContext(AuthContext);
  const [data, setData] = useState([]);

  const fetch = useCallback(async () => {
    const result = await getMyDataRequest(token);
    setData(result);
  }, [token]);

  return { data, fetch };
}
```

2. **Crear Page** (`pages/MyPage.tsx`):

```typescript
export default function MyPage() {
  const { data, fetch } = useMyFeature();

  return (
    <View style={globalStyles.screen}>
      <Header title="Mi Página" />
      <ScrollView>
        <Card>
          {data.map(item => <Text>{item.name}</Text>)}
        </Card>
      </ScrollView>
    </View>
  );
}
```

3. **Referenciar en app/tabs** (`app/tabs/mypage.tsx`):

```typescript
import MyPage from "../../pages/MyPage";
export default function MyPageTab() {
  return <MyPage />;
}
```

### Usar un Container en Componente:

```typescript
// En un componente reutilizable
function MyComponent() {
  const { subjects, addSubject } = useSubjects();

  return (
    <View>
      {subjects.map(s => (
        <Chip key={s.id} label={s.name} />
      ))}
    </View>
  );
}
```

## ✅ Checklist de Implementación

- ✅ Tipos TypeScript completos (User, Subject, Activity, Event)
- ✅ API Service con todos los endpoints
- ✅ Autenticación JWT con AsyncStorage
- ✅ Componentes UI reutilizables
- ✅ Containers con hooks personalizados
- ✅ Pages completas refactorizadas
- ✅ Diseño moderno (colores, spacing, shadows)
- ✅ Loading states en todas las operaciones
- ✅ Error handling con Alerts
- ✅ Validaciones básicas
- ✅ Arquitectura escalable y mantenible

## 🔄 DRY (Don't Repeat Yourself)

### Estilos:

- Usar `globalStyles.ts` para todo
- Colores centralizados en `colors` object
- No hardcodear estilos

### Lógica:

- Usar containers (custom hooks) reutilizables
- API service centralizado
- No duplicar llamadas HTTP

### Componentes:

- Maximizar reutilización
- Props driven
- Variants para comportamientos diferentes

## 🎓 Principios SOLID

- **S** - Single Responsibility: Cada componente/container tiene un propósito
- **O** - Open/Closed: Componentes abiertos a extensión (props, variants)
- **L** - Liskov Substitution: Componentes intercambiables
- **I** - Interface Segregation: Props específicas por necesidad
- **D** - Dependency Inversion: Usar contexto para dependencias globales

## 📝 Próximos Pasos (Futuro)

- [ ] Agregar Tests (Jest + React Native Testing Library)
- [ ] Implementar Analytics
- [ ] Agregar Push Notifications
- [ ] Implementar Features de IA (recomendaciones)
- [ ] Dark Mode
- [ ] Internacionalización (i18n)
- [ ] Redux/Zustand para state management más complejo
- [ ] Offline support con SQLite

---

**Mantén la arquitectura limpia. Cada cambio nuevo debe respetar esta estructura.**
