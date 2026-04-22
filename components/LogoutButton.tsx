import { useContext } from "react";
import { Text, TouchableOpacity } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { globalStyles } from "../styles/globalStyles";

export default function LogoutButton() {
  const { logout } = useContext(AuthContext);

  return (
    <TouchableOpacity onPress={logout} style={globalStyles.buttonDelete}>
      <Text style={globalStyles.buttonDeleteText}>Salir</Text>
    </TouchableOpacity>
  );
}
