import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import Card from "../components/Card";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { AuthContext } from "../context/AuthContext";
import { colors, globalStyles } from "../styles/globalStyles";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = { email: "", password: "" };
    let isValid = true;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Email válido requerido";
      isValid = false;
    }

    if (!password || password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await login(email, password);
      router.replace("/tabs/home");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    router.push("/register");
  };

  return (
    <View style={globalStyles.screen}>
      <ScrollView
        contentContainerStyle={globalStyles.contentCentered}
        scrollEnabled={false}
      >
        <Card variant="large" style={{ width: "100%", maxWidth: 420 }}>
          {/* Logo/Title */}
          <View style={globalStyles.centerContent}>
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: colors.primaryLight,
                marginBottom: 16,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: colors.white,
                  borderRadius: 25,
                }}
              />
            </View>
          </View>

          {/* Title */}
          <View style={globalStyles.centerContent}>
            <Text
              style={{
                fontSize: 32,
                fontWeight: "700",
                color: colors.primary,
                marginBottom: 10,
              }}
            >
              StudyConnect
            </Text>
          </View>

          {/* Form */}
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

          {/* Login Button */}
          <CustomButton
            title="Iniciar Sesión"
            onPress={handleLogin}
            loading={loading}
            disabled={loading}
            style={{ marginTop: 24 }}
          />

          {/* Divider */}
          <View style={[globalStyles.divider, { marginVertical: 20 }]} />

          {/* Register Link */}
          <CustomButton
            title="Crear Cuenta"
            variant="outline"
            onPress={handleRegister}
            disabled={loading}
          />
        </Card>
      </ScrollView>
    </View>
  );
}
