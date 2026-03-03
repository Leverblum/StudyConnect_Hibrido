import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="home" options={{ title: "Inicio" }} />
      <Tabs.Screen name="tasks" options={{ title: "Tareas" }} />
      <Tabs.Screen name="subjects" options={{ title: "Materias" }} />
      <Tabs.Screen name="calendar" options={{ title: "Calendario" }} />
    </Tabs>
  );
}