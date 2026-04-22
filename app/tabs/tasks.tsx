import { useContext, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CustomButton from "../../components/CustomButton";
import CustomButtonDelete from "../../components/CustomButtonDelete";
import Header from "../../components/Header";
import { AuthContext } from "../../context/AuthContext";
import {
  createActivityRequest,
  deleteActivityRequest,
  getActivitiesRequest,
  getSubjectsRequest,
} from "../../services/api";
import { globalStyles } from "../../styles/globalStyles";

export default function Tasks() {
  const { token } = useContext(AuthContext);

  const [task, setTask] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<any>(null);

  const [subjects, setSubjects] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);

  // 📚 CARGAR MATERIAS
  const loadSubjects = async () => {
    try {
      const data = await getSubjectsRequest(token!);
      setSubjects(data);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  // 📝 CARGAR TASKS POR MATERIA
  const loadTasks = async (subjectId: number) => {
    try {
      const data = await getActivitiesRequest(subjectId, token!);
      setTasks(data);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  useEffect(() => {
    loadSubjects();
  }, []);

  // ➕ CREAR
  const addTask = async () => {
    if (!task || !selectedSubject) return;

    try {
      const newTask = await createActivityRequest(
        selectedSubject.id,
        task,
        token!,
      );

      setTasks([...tasks, newTask]);
      setTask("");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  // ❌ ELIMINAR
  const deleteTask = async (id: number) => {
    try {
      await deleteActivityRequest(id, token!);
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={globalStyles.screen}>
      {/* HEADER */}
      <Header title="Tareas" />

      <View style={globalStyles.content}>
        {/* CREAR */}
        <View style={[globalStyles.card, globalStyles.cardCompact]}>
          <Text style={globalStyles.cardSmallTitle}>Nueva Tarea</Text>

          {/* 📚 SUBJECTS */}
          <FlatList
            data={subjects}
            horizontal
            keyExtractor={(item) => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ marginBottom: 10 }}
            renderItem={({ item }) => {
              const isSelected = selectedSubject?.id === item.id;

              return (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedSubject(item);
                    loadTasks(item.id);
                  }}
                  style={[
                    globalStyles.chip,
                    isSelected && globalStyles.chipSelected,
                  ]}
                >
                  <Text
                    style={[
                      globalStyles.chipText,
                      isSelected && globalStyles.chipTextSelected,
                    ]}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />

          {/* INPUT */}
          <TextInput
            placeholder="Escribe una tarea..."
            style={[globalStyles.input, globalStyles.inputSmallMargin]}
            value={task}
            onChangeText={setTask}
          />

          <CustomButton title="Agregar" onPress={addTask} />
        </View>

        {/* LISTA */}
        <View style={globalStyles.flexOne}>
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={[globalStyles.card, globalStyles.cardCompact]}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <CustomButtonDelete
                    title="♻"
                    onPress={() => deleteTask(item.id)}
                  />

                  <Text
                    style={[globalStyles.cardSmallTitle, { marginLeft: 10 }]}
                  >
                    {item.title}
                  </Text>
                </View>

                <Text style={globalStyles.textSecondary}>{item.status}</Text>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
}
