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
import Header from "../components/Header";
import { useSubjects } from "../containers/useSubjects";
import { colors, globalStyles } from "../styles/globalStyles";

const SUBJECT_COLORS = [
  "#6366F1", // Indigo
  "#8B5CF6", // Violet
  "#EC4899", // Pink
  "#F59E0B", // Amber
  "#10B981", // Emerald
  "#06B6D4", // Cyan
];

export default function SubjectsPage() {
  const { subjects, loading, refreshSubjects, addSubject, deleteSubject } =
    useSubjects();

  const [name, setName] = useState("");
  const [selectedColor, setSelectedColor] = useState(SUBJECT_COLORS[0]);
  const [isCreating, setIsCreating] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleAddSubject = async () => {
    if (!name.trim()) {
      Alert.alert("Error", "Ingresa el nombre de la materia");
      return;
    }

    setIsCreating(true);
    const result = await addSubject({
      name: name.trim(),
      color: selectedColor,
    });

    if (result) {
      setName("");
      setSelectedColor(SUBJECT_COLORS[0]);
    }
    setIsCreating(false);
  };

  const handleDelete = async (id: number, subjectName: string) => {
    const confirmed =
      Platform.OS === "web" && typeof window !== "undefined"
        ? window.confirm(`¿Eliminar la materia "${subjectName}"?`)
        : await new Promise<boolean>((resolve) => {
            Alert.alert("Eliminar", `¿Eliminar la materia "${subjectName}"?`, [
              { text: "Cancelar", onPress: () => resolve(false) },
              {
                text: "Eliminar",
                onPress: () => resolve(true),
                style: "destructive",
              },
            ]);
          });

    if (!confirmed) {
      return;
    }

    const removed = await deleteSubject(id);
    if (removed) {
      await refreshSubjects();
    }
  };

  useFocusEffect(
    useCallback(() => {
      refreshSubjects();
    }, [refreshSubjects]),
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await refreshSubjects();
    setRefreshing(false);
  };

  if (loading && subjects.length === 0) {
    return (
      <View style={globalStyles.screen}>
        <Header title="Materias" />
        <View style={globalStyles.loadingContainer}>
          <ActivityIndicator color={colors.primary} size="large" />
        </View>
      </View>
    );
  }

  return (
    <View style={globalStyles.screen}>
      <Header title="Materias" />

      <FlatList
        contentContainerStyle={globalStyles.content}
        data={subjects}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={
          <Card variant="large" style={{ marginBottom: 20 }}>
            <Text style={globalStyles.cardTitle}>Nueva Materia</Text>

            <CustomInput
              label="Nombre"
              placeholder="Ej: Cálculo, Física..."
              value={name}
              onChangeText={setName}
              editable={!isCreating}
            />

            <Text
              style={[
                globalStyles.inputLabel,
                { marginTop: 8, marginBottom: 8 },
              ]}
            >
              Color
            </Text>
            <View
              style={[
                globalStyles.row,
                { flexWrap: "wrap", gap: 8, marginBottom: 16 },
              ]}
            >
              {SUBJECT_COLORS.map((color) => (
                <Chip
                  key={color}
                  label=" "
                  selected={selectedColor === color}
                  onPress={() => setSelectedColor(color)}
                  color={color}
                  style={{ width: 48, height: 48 }}
                />
              ))}
            </View>

            <CustomButton
              title="Agregar Materia"
              onPress={handleAddSubject}
              loading={isCreating}
              disabled={isCreating || !name.trim()}
            />
          </Card>
        }
        renderItem={({ item }) => (
          <Card
            style={[
              { marginBottom: 12 },
              { borderLeftWidth: 4, borderLeftColor: item.color },
            ]}
          >
            <View style={globalStyles.rowBetween}>
              <View style={globalStyles.flexOne}>
                <Text style={globalStyles.cardSubtitle}>{item.name}</Text>
                <View
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 6,
                    backgroundColor: item.color,
                    marginTop: 4,
                  }}
                />
              </View>

              <CustomButton
                title="Eliminar"
                variant="danger"
                size="small"
                onPress={() => handleDelete(item.id, item.name)}
              />
            </View>
          </Card>
        )}
        ListEmptyComponent={
          loading ? null : (
            <View style={globalStyles.emptyStateContainer}>
              <Text style={globalStyles.emptyStateText}>
                No hay materias aún. ¡Crea una para comenzar!
              </Text>
            </View>
          )
        }
      />
    </View>
  );
}
