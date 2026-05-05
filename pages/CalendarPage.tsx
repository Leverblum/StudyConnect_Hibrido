import { useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    Text,
    View,
} from "react-native";
import Card from "../components/Card";
import Header from "../components/Header";
import { useEvents } from "../containers/useEvents";
import { useSubjects } from "../containers/useSubjects";
import { colors, globalStyles } from "../styles/globalStyles";

export default function CalendarPage() {
  const { events, loading, refreshEvents } = useEvents();
  const { subjects } = useSubjects();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refreshEvents();
    setRefreshing(false);
  };

  const getSubjectName = (subjectId: string) => {
    return subjects.find((s) => s.id === subjectId)?.name || "Sin materia";
  };

  const getSubjectColor = (subjectId: string) => {
    return subjects.find((s) => s.id === subjectId)?.color || colors.gray400;
  };

  // Agrupar eventos por fecha
  const groupedEvents = events.reduce(
    (acc, event) => {
      const date = new Date(event.date).toLocaleDateString("es-ES", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      if (!acc[date]) acc[date] = [];
      acc[date].push(event);
      return acc;
    },
    {} as Record<string, typeof events>,
  );

  const sortedDates = Object.keys(groupedEvents).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime(),
  );

  if (loading && events.length === 0) {
    return (
      <View style={globalStyles.screen}>
        <Header title="Calendario" />
        <View style={globalStyles.loadingContainer}>
          <ActivityIndicator color={colors.primary} size="large" />
        </View>
      </View>
    );
  }

  return (
    <View style={globalStyles.screen}>
      <Header title="Calendario" />

      <FlatList
        contentContainerStyle={globalStyles.content}
        data={sortedDates}
        keyExtractor={(item) => item}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item: date }) => (
          <View key={date} style={{ marginBottom: 20 }}>
            <Text
              style={[
                globalStyles.textBold,
                { fontSize: 16, color: colors.primary, marginBottom: 12 },
              ]}
            >
              {date}
            </Text>

            {groupedEvents[date].map((event) => (
              <Card key={event.id} style={{ marginBottom: 8 }}>
                <View>
                  <View style={globalStyles.rowBetween}>
                    <View style={globalStyles.flexOne}>
                      <Text style={globalStyles.cardSubtitle}>
                        {event.title}
                      </Text>
                      <Text style={globalStyles.textSmall}>
                        {getSubjectName(event.subjectId)}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: 6,
                        backgroundColor: getSubjectColor(event.subjectId),
                      }}
                    />
                  </View>

                  {event.time && (
                    <Text style={[globalStyles.textSmall, { marginTop: 8 }]}>
                      🕐 {event.time}
                    </Text>
                  )}

                  {event.location && (
                    <Text style={[globalStyles.textSmall, { marginTop: 4 }]}>
                      📍 {event.location}
                    </Text>
                  )}

                  {event.description && (
                    <Text
                      style={[
                        globalStyles.textSmall,
                        { marginTop: 8, fontStyle: "italic" },
                      ]}
                    >
                      {event.description}
                    </Text>
                  )}

                  {event.eventType && (
                    <View
                      style={{
                        marginTop: 8,
                        paddingVertical: 4,
                        paddingHorizontal: 8,
                        backgroundColor: colors.gray200,
                        borderRadius: 6,
                        alignSelf: "flex-start",
                      }}
                    >
                      <Text style={globalStyles.textSmall}>
                        {event.eventType === "exam"
                          ? "📝 Examen"
                          : event.eventType === "class"
                            ? "📚 Clase"
                            : event.eventType === "meeting"
                              ? "🤝 Reunión"
                              : "📅 Evento"}
                      </Text>
                    </View>
                  )}
                </View>
              </Card>
            ))}
          </View>
        )}
        ListEmptyComponent={
          !loading && (
            <View style={globalStyles.emptyStateContainer}>
              <Text style={globalStyles.emptyStateText}>
                No hay eventos próximos
              </Text>
            </View>
          )
        }
      />
    </View>
  );
}
