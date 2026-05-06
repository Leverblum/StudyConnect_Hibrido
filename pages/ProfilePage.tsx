import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import { Alert, View } from "react-native";
import Card from "../components/Card";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import Header from "../components/Header";
import { AuthContext } from "../context/AuthContext";
import { globalStyles } from "../styles/globalStyles";

export default function ProfilePage() {
  const router = useRouter();
  const { user, token, updateProfile } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ name: "", email: "" });

  const validate = () => {
    const nextErrors = { name: "", email: "" };
    let valid = true;

    if (!name.trim()) {
      nextErrors.name = "El nombre es obligatorio";
      valid = false;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Correo válido requerido";
      valid = false;
    }

    setErrors(nextErrors);
    return valid;
  };

  const handleSave = async () => {
    if (!validate() || !token) return;

    setLoading(true);
    try {
      await updateProfile({ name: name.trim(), email: email.trim() });
      Alert.alert(
        "Perfil actualizado",
        "Tus datos se han guardado correctamente.",
      );
      router.back();
    } catch (error: any) {
      Alert.alert("Error", error.message || "No se pudo actualizar el perfil.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={globalStyles.screen}>
      <Header title="Perfil" onBackPress={() => router.back()} />
      <View style={globalStyles.content}>
        <Card variant="large">
          <CustomInput
            label="Nombre"
            placeholder="Tu nombre completo"
            value={name}
            onChangeText={setName}
            error={errors.name}
            editable={!loading}
          />

          <CustomInput
            label="Correo"
            placeholder="tu@email.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
            editable={!loading}
          />

          <CustomButton
            title="Guardar cambios"
            onPress={handleSave}
            loading={loading}
            disabled={loading}
            style={{ marginTop: 20 }}
          />
        </Card>
      </View>
    </View>
  );
}
