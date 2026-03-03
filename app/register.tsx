import { View, Text, TextInput, Pressable } from "react-native";
import { useState } from "react";
import { globalStyles } from "../styles/globalStyles";
import CustomButton from "../components/CustomButton";
import { useRouter } from "expo-router";

export default function Register() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    if (!name || !email || !password) return;

    console.log("Registrado:", name, email, password);
    router.replace("/login");
  };

  const handleLogin = () => {
    router.push("/login");
  }

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
              Ya tienes una cuenta? Inicia sesión
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
