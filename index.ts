// ============================================================================
// BARREL EXPORTS - Facilita las importaciones en todo el proyecto
// ============================================================================

// COMPONENTS
export { default as Badge } from "./components/Badge";
export { default as Card } from "./components/Card";
export { default as Chip } from "./components/Chip";
export { default as CustomButton } from "./components/CustomButton";
export { default as CustomInput } from "./components/CustomInput";
export { default as Header } from "./components/Header";
export { default as ListItem } from "./components/ListItem";
export { default as LogoutButton } from "./components/LogoutButton";
export { default as TaskItem } from "./components/TaskItem";

// CONTAINERS
export { useActivities } from "./containers/useActivities";
export { useEvents } from "./containers/useEvents";
export { useSubjects } from "./containers/useSubjects";

// PAGES
export { default as ActivitiesPage } from "./pages/ActivitiesPage";
export { default as CalendarPage } from "./pages/CalendarPage";
export { default as HomePage } from "./pages/HomePage";
export { default as LoginPage } from "./pages/LoginPage";
export { default as RegisterPage } from "./pages/RegisterPage";
export { default as SubjectsPage } from "./pages/SubjectsPage";

// CONTEXT
export { AuthContext, AuthProvider } from "./context/AuthContext";

// SERVICES
export * from "./services/api";

// TYPES
export * from "./types/Subject";
export * from "./types/Task";
export * from "./types/User";

// STYLES
export { colors, globalStyles } from "./styles/globalStyles";

