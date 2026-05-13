import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { Alert, Pressable } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { colors } from "../styles/globalStyles";

export default function LogoutButton() {
  const { logout } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert("Cerrar sesión", "¿Estás seguro de que deseas cerrar sesión?", [
      { text: "Cancelar", onPress: () => {} },
      {
        text: "Salir",
        onPress: async () => {
          try {
            await logout();
          } catch (error) {
            console.error("Logout error:", error);
          } finally {
            router.replace("/login");
          }
        },
        style: "destructive",
      },
    ]);
  };

  return (
    <Pressable onPress={handleLogout} style={{ padding: 8 }}>
      <MaterialIcons name="logout" size={24} color={colors.white} />
    </Pressable>
  );
}
