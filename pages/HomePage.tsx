import { useContext } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
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
  const { subjects, loading: subjectsLoading } = useSubjects();
  const { activities, loading: activitiesLoading } = useActivities();

  // Próximas 3 actividades sin completar
  const upcomingActivities = activities
    .filter((a) => !a.completed)
    .sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
    )
    .slice(0, 3);

  // Actividades vencidas
  const overdueActivities = activities.filter(
    (a) => !a.completed && new Date(a.dueDate) < new Date(),
  );

  const completedToday = activities.filter((a) => {
    const today = new Date();
    const activityDate = new Date(a.createdAt || "");
    return a.completed && activityDate.toDateString() === today.toDateString();
  }).length;

  return (
    <View style={globalStyles.screen}>
      <Header
        title="Inicio"
        subtitle={`Bienvenido, ${user?.name || "Usuario"}`}
        rightAction={<LogoutButton />}
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
          <Card>
            <Text style={globalStyles.cardTitle}>Próximas Entregas</Text>

            {upcomingActivities.map((activity) => (
              <View
                key={activity.id}
                style={[globalStyles.dividerSmall, globalStyles.mt12]}
              >
                <View style={globalStyles.rowBetween}>
                  <View style={globalStyles.flexOne}>
                    <Text style={globalStyles.textBold}>{activity.title}</Text>
                    <Text style={globalStyles.textSmall}>
                      {new Date(activity.dueDate).toLocaleDateString()}
                    </Text>
                  </View>
                  {activity.priority && (
                    <Badge
                      label={activity.priority}
                      variant={
                        activity.priority === "high"
                          ? "error"
                          : activity.priority === "medium"
                            ? "warning"
                            : "info"
                      }
                      size="small"
                    />
                  )}
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
