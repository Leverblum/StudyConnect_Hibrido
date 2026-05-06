import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  Text,
  View,
} from "react-native";

import Card from "../components/Card";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import DatePicker from "../components/DatePicker";
import Header from "../components/Header";

import { useActivities } from "../containers/useActivities";
import { useEvents } from "../containers/useEvents";
import { useSubjects } from "../containers/useSubjects";

import { colors, globalStyles } from "../styles/globalStyles";

export default function CalendarPage() {
  const { subjects } = useSubjects();
  const { events, loading, refreshEvents, addEvent } = useEvents();
  const { activities } = useActivities();

  const [refreshing, setRefreshing] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventDueDate, setEventDueDate] = useState(new Date());
  const [creating, setCreating] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refreshEvents();
    setRefreshing(false);
  };

  const handleAddEvent = async () => {
    if (!eventTitle.trim()) {
      Alert.alert("Error", "Ingresa el título");
      return;
    }

    setCreating(true);

    const result = await addEvent({
      title: eventTitle,
      description: eventDescription,
      due_date: eventDueDate.toISOString().split("T")[0],
      status: "pending",
    });

    if (result) {
      setEventTitle("");
      setEventDescription("");
      setEventDueDate(new Date());
    }

    setCreating(false);
  };

  const allItems = [
    ...events.map((e) => ({ ...e, type: "event" })),
    ...activities.map((a) => ({ ...a, type: "activity" })),
  ];

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
            <Text style={globalStyles.cardTitle}>Nuevo Evento</Text>

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

            <CustomButton
              title="Agregar"
              onPress={handleAddEvent}
              loading={creating}
            />
          </Card>
        }
        renderItem={({ item }) => (
          <Card>
            <Text style={globalStyles.cardSubtitle}>{item.title}</Text>

            <Text style={globalStyles.textSmall}>
              {new Date(item.due_date).toLocaleDateString()}
            </Text>

            {item.description && (
              <Text style={globalStyles.textSmall}>{item.description}</Text>
            )}
          </Card>
        )}
      />
    </View>
  );
}
