import { View, Text } from "react-native";
import { globalStyles } from "../../styles/globalStyles";

export default function Calendar() {

  const today = new Date();

  return (
    <View style={globalStyles.screen}>

      <View style={globalStyles.header}>
        <Text style={globalStyles.headerTitle}>Calendario</Text>
      </View>

      <View style={globalStyles.content}>

        <View style={globalStyles.card}>
          <Text style={globalStyles.cardSubtitle}>
            Fecha Actual
          </Text>

          <Text style={globalStyles.textPrimary}>
            {today.toDateString()}
          </Text>
        </View>

        <View style={globalStyles.card}>
          <Text style={globalStyles.cardSmallTitle}>
            Próximos Eventos
          </Text>

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