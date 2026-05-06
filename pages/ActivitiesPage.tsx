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
import Chip from "../components/Chip";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import DatePicker from "../components/DatePicker";
import Header from "../components/Header";
import TaskItem from "../components/TaskItem";
import { useActivities } from "../containers/useActivities";
import { useSubjects } from "../containers/useSubjects";
import { colors, globalStyles } from "../styles/globalStyles";

export default function ActivitiesPage() {
  const {
    activities,
    loading,
    refreshActivities,
    addActivity,
    deleteActivity,
    updateActivity,
  } = useActivities();
  const { subjects } = useSubjects();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<number | null>(null);
  const [dueDate, setDueDate] = useState(new Date());
  const [isCreating, setIsCreating] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<"all" | "pending" | "completed">(
    "pending",
  );

  const handleAddActivity = async () => {
    if (!title.trim() || !selectedSubject) {
      Alert.alert("Error", "Completa todos los campos");
      return;
    }

    setIsCreating(true);
    const dateString = dueDate.toISOString().split("T")[0];

    const result = await addActivity({
      title: title.trim(),
      description: description.trim() || undefined,
      subject_id: selectedSubject,
      due_date: dateString,
      status: "pending",
    });

    if (result) {
      setTitle("");
      setDescription("");
      setSelectedSubject(null);
      setDueDate(new Date());
    }
    setIsCreating(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refreshActivities();
    setRefreshing(false);
  };

  const getFilteredActivities = () => {
    switch (filter) {
      case "completed":
        return activities.filter((a) => a.status === "completed");
      case "pending":
        return activities.filter((a) => a.status === "pending");
      default:
        return activities;
    }
  };

  const getSubjectName = (subjectId: number) => {
    return subjects.find((s) => s.id === subjectId)?.name || "Sin materia";
  };

  const getSubjectColor = (subjectId: number) => {
    return subjects.find((s) => s.id === subjectId)?.color || colors.gray400;
  };

  const filteredActivities = getFilteredActivities().sort(
    (a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime(),
  );

  if (loading && activities.length === 0) {
    return (
      <View style={globalStyles.screen}>
        <Header title="Actividades" />
        <View style={globalStyles.loadingContainer}>
          <ActivityIndicator color={colors.primary} size="large" />
        </View>
      </View>
    );
  }

  return (
    <View style={globalStyles.screen}>
      <Header title="Actividades" />

      <FlatList
        contentContainerStyle={globalStyles.content}
        data={filteredActivities}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={
          <>
            {/* Create Card */}
            <Card variant="large" style={{ marginBottom: 20 }}>
              <Text style={globalStyles.cardTitle}>Nueva Actividad</Text>

              <CustomInput
                label="Título"
                placeholder="Ej: Realizar proyecto..."
                value={title}
                onChangeText={setTitle}
                editable={!isCreating}
              />

              <CustomInput
                label="Descripción (opcional)"
                placeholder="Detalles de la actividad..."
                value={description}
                onChangeText={setDescription}
                editable={!isCreating}
              />

              <DatePicker
                label="Fecha de entrega"
                value={dueDate}
                onChange={setDueDate}
                minimumDate={new Date()}
              />

              <Text style={globalStyles.inputLabel}>Materia</Text>
              <View
                style={[
                  globalStyles.row,
                  { flexWrap: "wrap", gap: 8, marginBottom: 16 },
                ]}
              >
                {subjects.map((subject) => (
                  <Chip
                    key={subject.id}
                    label={subject.name}
                    selected={selectedSubject === subject.id}
                    onPress={() => setSelectedSubject(subject.id)}
                    color={subject.color}
                  />
                ))}
              </View>

              <CustomButton
                title="Agregar Actividad"
                onPress={handleAddActivity}
                loading={isCreating}
                disabled={isCreating || !title.trim() || !selectedSubject}
              />
            </Card>

            {/* Filters */}
            <View style={[globalStyles.row, { gap: 8, marginBottom: 16 }]}>
              {(["pending", "completed", "all"] as const).map((f) => (
                <Chip
                  key={f}
                  label={
                    f === "pending"
                      ? "Pendientes"
                      : f === "completed"
                        ? "Completadas"
                        : "Todas"
                  }
                  selected={filter === f}
                  onPress={() => setFilter(f)}
                />
              ))}
            </View>
          </>
        }
        renderItem={({ item }) => (
          <TaskItem
            activity={item}
            onToggle={() =>
              updateActivity(item.id, {
                status: item.status === "completed" ? "pending" : "completed",
              })
            }
            onDelete={() => deleteActivity(item.id)}
            showSubject
            subjectName={getSubjectName(item.subject_id)}
            subjectColor={getSubjectColor(item.subject_id)}
          />
        )}
        ListEmptyComponent={
          !loading ? (
            <View style={globalStyles.emptyStateContainer}>
              <Text style={globalStyles.emptyStateText}>
                No hay actividades{" "}
                {filter === "pending" ? "pendientes" : "completadas"}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
}
