import { View, Text, TextInput, Pressable } from "react-native";
import { useState, useContext } from "react";
import { globalStyles } from "../styles/globalStyles";
import CustomButton from "../components/CustomButton";
import { useRouter } from "expo-router";
import { AuthContext } from "../context/AuthContext";

export default function Login() {

  const router = useRouter();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) return;
    login(email);
    router.replace("/tabs/home");
  };

  const handleRegister = () => {
    router.push("/register");
  }

  return (
    <View style={globalStyles.screen}>

      <View style={globalStyles.header}>
        <Text style={globalStyles.headerTitle}>StudyConnect</Text>
      </View>

      <View style={globalStyles.content}>

        <View style={globalStyles.card}>
          <Text style={globalStyles.cardTitle}>
            Iniciar Sesión
          </Text>

          <TextInput
            placeholder="Correo"
            style={globalStyles.input}
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            placeholder="Contraseña"
            secureTextEntry
            style={globalStyles.input}
            value={password}
            onChangeText={setPassword}
          />

          <CustomButton
            title="Ingresar"
            onPress={handleLogin}
          />

          <Pressable onPress={handleRegister}>
            <Text style={globalStyles.registerTex}>
              ¿No tienes una cuenta? Regístrate
            </Text>
          </Pressable>
        </View>

      </View>
    </View>
  );
}