import { Text, View } from "react-native";
import LogoutButton from "../../components/LogoutButton";
import { globalStyles } from "../../styles/globalStyles";

export default function Home() {
  return (
    <View style={globalStyles.screen}>
      {/* HEADER */}
      <View style={globalStyles.header}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={globalStyles.headerTitle}>Inicio</Text>

          <LogoutButton />
        </View>
      </View>

      {/* CONTENT */}
      <View style={globalStyles.content}>
        <View style={globalStyles.card}>
          <Text style={globalStyles.cardSmallTitle}>Materias Activas</Text>

          <Text style={[globalStyles.textPrimary, globalStyles.textMarginTop]}>
            3 materias registradas
          </Text>
        </View>

        <View style={globalStyles.card}>
          <Text style={globalStyles.cardSmallTitle}>Próxima Entrega</Text>

          <Text style={[globalStyles.textPrimary, globalStyles.textMarginTop]}>
            Proyecto final - Viernes
          </Text>
        </View>
      </View>
    </View>
  );
}
