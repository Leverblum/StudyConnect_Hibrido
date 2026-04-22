import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import CustomButton from "../components/CustomButton";
import { registerRequest } from "../services/api";
import { globalStyles } from "../styles/globalStyles";

export default function Register() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Completa todos los campos");
      return;
    }

    try {
      const data = await registerRequest(name, email, password);

      console.log("USUARIO REGISTRADO:", data);

      Alert.alert("Éxito", "Usuario creado correctamente");

      router.replace("/login");
    } catch (error: any) {
      console.log("ERROR REGISTER:", error.message);
      Alert.alert("Error", error.message);
    }
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <View style={globalStyles.screen}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.headerTitle}>StudyConnect</Text>
      </View>

      <View style={globalStyles.content}>
        <View style={globalStyles.card}>
          <Text style={globalStyles.cardTitle}>Crear Cuenta</Text>

          <TextInput
            placeholder="Nombre"
            style={globalStyles.input}
            value={name}
            onChangeText={setName}
          />

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

          <CustomButton title="Registrarse" onPress={handleRegister} />

          <Pressable onPress={handleLogin}>
            <Text style={globalStyles.registerTex}>
              ¿Ya tienes una cuenta? Inicia sesión
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
