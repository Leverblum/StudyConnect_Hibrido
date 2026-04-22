import { Text, View } from "react-native";
import Header from "../../components/Header";
import { globalStyles } from "../../styles/globalStyles";

export default function Calendar() {
  const today = new Date();

  return (
    <View style={globalStyles.screen}>
      <Header title="Calendario" />
      <View style={globalStyles.content}>
        <View style={globalStyles.card}>
          <Text style={globalStyles.cardSubtitle}>Fecha Actual</Text>

          <Text style={globalStyles.textPrimary}>{today.toDateString()}</Text>
        </View>

        <View style={globalStyles.card}>
          <Text style={globalStyles.cardSmallTitle}>Próximos Eventos</Text>

          <Text style={[globalStyles.textPrimary, globalStyles.textMarginTop]}>
            • Examen Matemáticas - Fecha de Entrega : {today.toDateString()}
          </Text>

          <Text style={globalStyles.textPrimary}>
            • Entrega Proyecto - Fecha de Entrega : {today.toDateString()}
          </Text>
        </View>
      </View>
    </View>
  );
}
