import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Platform,
    RefreshControl,
    Text,
    View,
} from "react-native";

import Card from "../components/Card";
import Chip from "../components/Chip";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import DatePicker from "../components/DatePicker";
import Header from "../components/Header";

import { useActivities } from "../containers/useActivities";
import { useEvents } from "../containers/useEvents";
import { colors, globalStyles } from "../styles/globalStyles";
import { Activity, Event } from "../types/Task";

const parseDateOnly = (dateString?: string | null) => {
  if (!dateString || typeof dateString !== "string") {
    return new Date();
  }

  const [datePart] = dateString.split("T");
  if (!datePart) {
    return new Date();
  }

  const parts = datePart.split("-");
  if (parts.length !== 3) {
    return new Date();
  }

  const [year, month, day] = parts.map(Number);
  const date = new Date(year, month - 1, day);
  return Number.isNaN(date.getTime()) ? new Date() : date;
};

export default function CalendarPage() {
  const { events, loading, refreshEvents, addEvent, updateEvent, deleteEvent } =
    useEvents();
  const { activities, refreshActivities } = useActivities();

  const [refreshing, setRefreshing] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventDueDate, setEventDueDate] = useState(new Date());
  const [eventStatus, setEventStatus] = useState<Event["status"]>("pending");
  const [editingEventId, setEditingEventId] = useState<number | null>(null);
  const [creating, setCreating] = useState(false);

  const resetForm = () => {
    setEventTitle("");
    setEventDescription("");
    setEventDueDate(new Date());
    setEventStatus("pending");
    setEditingEventId(null);
  };

  type CalendarItem =
    | ({ type: "event" } & Event)
    | ({ type: "activity" } & Activity);

  useFocusEffect(
    useCallback(() => {
      refreshEvents();
      refreshActivities();
    }, [refreshActivities, refreshEvents]),
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([refreshEvents(), refreshActivities()]);
    setRefreshing(false);
  };

  const handleSaveEvent = async () => {
    if (!eventTitle.trim()) {
      Alert.alert("Error", "Ingresa el título");
      return;
    }

    if (Number.isNaN(eventDueDate.getTime())) {
      Alert.alert("Error", "Selecciona una fecha válida");
      return;
    }

    setCreating(true);
    const due_date = eventDueDate.toISOString().split("T")[0];

    if (editingEventId) {
      const updated = await updateEvent(editingEventId, {
        title: eventTitle.trim(),
        description: eventDescription.trim() || undefined,
        due_date,
        status: eventStatus,
      });

      if (updated) {
        resetForm();
      }
    } else {
      const result = await addEvent({
        title: eventTitle.trim(),
        description: eventDescription.trim() || undefined,
        due_date,
        status: eventStatus,
      });

      if (result) {
        resetForm();
      }
    }

    setCreating(false);
  };

  const handleEditEvent = (event: Event) => {
    setEditingEventId(event.id);
    setEventTitle(event.title);
    setEventDescription(event.description || "");
    setEventDueDate(parseDateOnly(event.due_date));
    setEventStatus(event.status);
  };

  const handleCancelEdit = () => {
    resetForm();
  };

  const handleDeleteEvent = async (id: number) => {
    const confirmed =
      Platform.OS === "web" && typeof window !== "undefined"
        ? window.confirm("¿Deseas eliminar este evento?")
        : await new Promise<boolean>((resolve) => {
            Alert.alert(
              "Eliminar evento",
              "¿Deseas eliminar este evento?",
              [
                {
                  text: "Cancelar",
                  style: "cancel",
                  onPress: () => resolve(false),
                },
                {
                  text: "Eliminar",
                  style: "destructive",
                  onPress: () => resolve(true),
                },
              ],
              { cancelable: true },
            );
          });

    if (!confirmed) {
      return;
    }

    const removed = await deleteEvent(id);
    if (removed) {
      await refreshEvents();
    }
  };

  const allItems: CalendarItem[] = [
    ...events.map((e) => ({ ...e, type: "event" }) as const),
    ...activities.map((a) => ({ ...a, type: "activity" }) as const),
  ].sort(
    (a, b) =>
      parseDateOnly(a.due_date).getTime() - parseDateOnly(b.due_date).getTime(),
  );

  if (loading && events.length === 0) {
    return (
      <View style={globalStyles.screen}>
        <Header title="Calendario" />
        <View style={globalStyles.centerContent}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </View>
    );
  }

  return (
    <View style={globalStyles.screen}>
      <Header title="Calendario" />

      <FlatList
        contentContainerStyle={globalStyles.content}
        data={allItems}
        keyExtractor={(item) => `${item.type}-${item.id}`}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={
          <Card>
            <Text style={globalStyles.cardTitle}>
              {editingEventId ? "Editar Evento" : "Nuevo Evento"}
            </Text>

            <CustomInput
              label="Título"
              value={eventTitle}
              onChangeText={setEventTitle}
            />

            <CustomInput
              label="Descripción"
              value={eventDescription}
              onChangeText={setEventDescription}
            />

            <DatePicker
              label="Fecha"
              value={eventDueDate}
              onChange={setEventDueDate}
            />

            <Text style={[globalStyles.inputLabel, { marginBottom: 8 }]}>
              Estado
            </Text>
            <View style={[globalStyles.row, { gap: 8, marginBottom: 16 }]}>
              {(["pending", "completed", "scheduled"] as Event["status"][]).map(
                (status) => (
                  <Chip
                    key={status}
                    label={
                      status === "pending"
                        ? "Pendiente"
                        : status === "completed"
                          ? "Completado"
                          : "Programado"
                    }
                    selected={eventStatus === status}
                    onPress={() => setEventStatus(status)}
                  />
                ),
              )}
            </View>

            <CustomButton
              title={editingEventId ? "Guardar cambios" : "Agregar"}
              onPress={handleSaveEvent}
              loading={creating}
            />

            {editingEventId ? (
              <CustomButton
                title="Cancelar"
                variant="outline"
                onPress={handleCancelEdit}
                disabled={creating}
                style={{ marginTop: 12 }}
              />
            ) : null}
          </Card>
        }
        renderItem={({ item }) => (
          <Card>
            <Text style={globalStyles.cardSubtitle}>{item.title}</Text>

            <Text style={globalStyles.textSmall}>
              {item.due_date
                ? parseDateOnly(item.due_date).toLocaleDateString()
                : "Sin fecha"}
            </Text>

            {item.description && (
              <Text style={globalStyles.textSmall}>{item.description}</Text>
            )}

            {item.type === "event" ? (
              <View style={[globalStyles.row, { gap: 8, marginTop: 12 }]}>
                <View
                  style={{
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 12,
                    backgroundColor:
                      item.status === "completed"
                        ? colors.success
                        : item.status === "scheduled"
                          ? colors.secondary
                          : colors.warning,
                  }}
                >
                  <Text
                    style={[globalStyles.textSmall, { color: colors.white }]}
                  >
                    {item.status === "completed"
                      ? "Completado"
                      : item.status === "scheduled"
                        ? "Programado"
                        : "Pendiente"}
                  </Text>
                </View>
                <CustomButton
                  title="Editar"
                  variant="outline"
                  size="small"
                  onPress={() => handleEditEvent(item)}
                />
                <CustomButton
                  title="Eliminar"
                  variant="danger"
                  size="small"
                  onPress={() => handleDeleteEvent(item.id)}
                />
              </View>
            ) : null}
          </Card>
        )}
      />
    </View>
  );
}
