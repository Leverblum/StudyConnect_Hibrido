import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import CustomButton from "../components/CustomButton";
import { AuthContext } from "../context/AuthContext";
import { globalStyles } from "../styles/globalStyles";

export default function Login() {
  const router = useRouter();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Completa todos los campos");
      return;
    }

    try {
      await login(email, password);
      router.replace("/tabs/home");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Error al iniciar sesión");
    }
  };

  const handleRegister = () => {
    router.push("/register");
  };

  return (
    <View style={globalStyles.screen}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.headerTitle}>StudyConnect</Text>
      </View>

      <View style={globalStyles.content}>
        <View style={globalStyles.card}>
          <Text style={globalStyles.cardTitle}>Iniciar Sesión</Text>

          <TextInput
            placeholder="Correo"
            style={globalStyles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />

          <TextInput
            placeholder="Contraseña"
            secureTextEntry
            style={globalStyles.input}
            value={password}
            onChangeText={setPassword}
          />

          <CustomButton title="Ingresar" onPress={handleLogin} />

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
