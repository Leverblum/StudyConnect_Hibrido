import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useCallback, useContext } from "react";
import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";
import Badge from "../components/Badge";
import Card from "../components/Card";
import Header from "../components/Header";
import LogoutButton from "../components/LogoutButton";
import { useActivities } from "../containers/useActivities";
import { useSubjects } from "../containers/useSubjects";
import { AuthContext } from "../context/AuthContext";
import { colors, globalStyles } from "../styles/globalStyles";

export default function HomePage() {
  const { user } = useContext(AuthContext);
  const { subjects, loading: subjectsLoading, refreshSubjects } = useSubjects();
  const {
    activities,
    loading: activitiesLoading,
    refreshActivities,
  } = useActivities();

  // Próximas 3 actividades sin completar
  const upcomingActivities = activities
    .filter((a) => a.status === "pending")
    .sort(
      (a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime(),
    )
    .slice(0, 3);

  // Actividades vencidas
  const overdueActivities = activities.filter(
    (a) => a.status === "pending" && new Date(a.due_date) < new Date(),
  );

  const completedToday = activities.filter((a) => {
    const today = new Date();
    const activityDate = new Date(a.created_at || "");
    return (
      a.status === "completed" &&
      activityDate.toDateString() === today.toDateString()
    );
  }).length;

  useFocusEffect(
    useCallback(() => {
      refreshSubjects();
      refreshActivities();
    }, [refreshActivities, refreshSubjects]),
  );

  const router = useRouter();

  const profileAction = (
    <Pressable
      onPress={() => router.push("/profile")}
      style={{ padding: 8, marginRight: 8 }}
    >
      <MaterialIcons name="person" size={24} color={colors.white} />
    </Pressable>
  );

  return (
    <View style={globalStyles.screen}>
      <Header
        title="Inicio"
        subtitle={`Bienvenido, ${user?.name || "Usuario"}`}
        rightAction={
          <View style={globalStyles.rowCenter}>
            {profileAction}
            <LogoutButton />
          </View>
        }
      />

      <ScrollView contentContainerStyle={globalStyles.content}>
        {/* Stats Cards */}
        <View style={[globalStyles.rowCenter, { gap: 12, marginBottom: 16 }]}>
          <Card
            variant="compact"
            style={[globalStyles.flexOne, globalStyles.centerContent]}
          >
            <Text
              style={[
                globalStyles.textBold,
                { fontSize: 28, color: colors.primary },
              ]}
            >
              {subjects.length}
            </Text>
            <Text style={globalStyles.textSmall}>Materias</Text>
          </Card>

          <Card
            variant="compact"
            style={[globalStyles.flexOne, globalStyles.centerContent]}
          >
            <Text
              style={[
                globalStyles.textBold,
                { fontSize: 28, color: colors.warning },
              ]}
            >
              {overdueActivities.length}
            </Text>
            <Text style={globalStyles.textSmall}>Vencidas</Text>
          </Card>

          <Card
            variant="compact"
            style={[globalStyles.flexOne, globalStyles.centerContent]}
          >
            <Text
              style={[
                globalStyles.textBold,
                { fontSize: 28, color: colors.success },
              ]}
            >
              {completedToday}
            </Text>
            <Text style={globalStyles.textSmall}>Hoy</Text>
          </Card>
        </View>

        {/* Próximas Entregas */}
        {activitiesLoading ? (
          <ActivityIndicator
            color={colors.primary}
            size="large"
            style={{ marginVertical: 32 }}
          />
        ) : upcomingActivities.length > 0 ? (
          <Card style={{ paddingVertical: 20 }}>
            <Text style={globalStyles.cardTitle}>Próximas Entregas</Text>

            {upcomingActivities.map((activity) => (
              <View
                key={activity.id}
                style={{
                  padding: 14,
                  borderRadius: 16,
                  backgroundColor: colors.backgroundSecondary,
                  marginBottom: 12,
                }}
              >
                <View style={globalStyles.rowBetween}>
                  <View style={globalStyles.flexOne}>
                    <Text style={[globalStyles.textBold, { marginBottom: 6 }]}>
                      {activity.title}
                    </Text>
                    <Text style={globalStyles.textSmall}>
                      {new Date(activity.due_date).toLocaleDateString()}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </Card>
        ) : (
          <Card>
            <View style={globalStyles.centerContent}>
              <Text style={globalStyles.textMuted}>
                No hay actividades pendientes
              </Text>
            </View>
          </Card>
        )}

        {/* Materias */}
        {subjectsLoading ? (
          <ActivityIndicator
            color={colors.primary}
            size="large"
            style={{ marginVertical: 32 }}
          />
        ) : subjects.length > 0 ? (
          <Card style={{ marginTop: 16 }}>
            <Text style={globalStyles.cardTitle}>Tus Materias</Text>
            <View style={[globalStyles.row, { flexWrap: "wrap", gap: 8 }]}>
              {subjects.map((subject) => (
                <Badge
                  key={subject.id}
                  label={subject.name}
                  variant="primary"
                />
              ))}
            </View>
          </Card>
        ) : null}
      </ScrollView>
    </View>
  );
}
