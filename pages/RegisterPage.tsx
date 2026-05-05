import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import Card from "../components/Card";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { registerRequest } from "../services/api";
import { globalStyles } from "../styles/globalStyles";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    let isValid = true;

    if (!name || name.length < 2) {
      newErrors.name = "Nombre mínimo 2 caracteres";
      isValid = false;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Email válido requerido";
      isValid = false;
    }

    if (!password || password.length < 6) {
      newErrors.password = "Mínimo 6 caracteres";
      isValid = false;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await registerRequest(name, email, password);
      Alert.alert(
        "Éxito",
        "Cuenta creada. Inicia sesión con tus credenciales.",
      );
      router.replace("/login");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Error al registrar");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    router.back();
  };

  return (
    <View style={globalStyles.screen}>
      <ScrollView contentContainerStyle={globalStyles.contentCentered}>
        <Card variant="large" style={{ width: "100%", maxWidth: 420 }}>
          {/* Header */}
          <View style={{ marginBottom: 24 }}>
            <Text style={globalStyles.cardTitle}>Crear Cuenta</Text>
            <Text style={globalStyles.textSecondary}>
              Únete a StudyConnect hoy
            </Text>
          </View>

          {/* Form */}
          <CustomInput
            label="Nombre Completo"
            placeholder="Tu nombre"
            value={name}
            onChangeText={setName}
            editable={!loading}
            error={errors.name}
          />

          <CustomInput
            label="Correo"
            placeholder="tu@email.com"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            editable={!loading}
            error={errors.email}
          />

          <CustomInput
            label="Contraseña"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!loading}
            error={errors.password}
          />

          <CustomInput
            label="Confirmar Contraseña"
            placeholder="••••••••"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            editable={!loading}
            error={errors.confirmPassword}
          />

          {/* Register Button */}
          <CustomButton
            title="Registrarse"
            onPress={handleRegister}
            loading={loading}
            disabled={loading}
            style={{ marginTop: 24 }}
          />

          {/* Divider */}
          <View style={[globalStyles.divider, { marginVertical: 20 }]} />

          {/* Back to Login */}
          <CustomButton
            title="Volver al Login"
            variant="outline"
            onPress={handleBackToLogin}
            disabled={loading}
          />
        </Card>
      </ScrollView>
    </View>
  );
}
