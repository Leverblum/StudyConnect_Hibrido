import { useContext, useEffect, useState } from "react";
import { Alert, FlatList, Text, TextInput, View } from "react-native";
import CustomButton from "../../components/CustomButton";
import CustomButtonDelete from "../../components/CustomButtonDelete";
import Header from "../../components/Header";
import { AuthContext } from "../../context/AuthContext";
import {
  createSubjectRequest,
  deleteSubjectRequest,
  getSubjectsRequest,
} from "../../services/api";
import { globalStyles } from "../../styles/globalStyles";

export default function Subjects() {
  const { token } = useContext(AuthContext);

  const [subjects, setSubjects] = useState<any[]>([]);
  const [name, setName] = useState("");

  // 🔥 CARGAR MATERIAS
  const loadSubjects = async () => {
    try {
      const data = await getSubjectsRequest(token!);
      setSubjects(data);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  useEffect(() => {
    loadSubjects();
  }, []);

  // ➕ CREAR
  const addSubject = async () => {
    if (!name) return;

    try {
      const newSubject = await createSubjectRequest(name, "#4A90E2", token!);

      setSubjects([...subjects, newSubject]);
      setName("");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  // ❌ ELIMINAR
  const deleteSubject = async (id: number) => {
    try {
      await deleteSubjectRequest(id, token!);
      setSubjects(subjects.filter((s) => s.id !== id));
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={globalStyles.screen}>
      {/* HEADER */}
      <Header title="Materias" />

      {/* CONTENT */}
      <View style={globalStyles.content}>
        {/* CREAR */}
        <View style={globalStyles.card}>
          <Text style={globalStyles.cardSubtitle}>Nueva Materia</Text>

          <TextInput
            placeholder="Escribe una materia..."
            style={globalStyles.input}
            value={name}
            onChangeText={setName}
          />

          <CustomButton title="Agregar" onPress={addSubject} />
        </View>

        {/* LISTA */}
        <FlatList
          data={subjects}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={globalStyles.card}>
              <View style={globalStyles.cardSpace}>
                <CustomButtonDelete
                  title="♻"
                  onPress={() => deleteSubject(item.id)}
                />

                <Text style={[globalStyles.cardSmallTitle, { marginLeft: 10 }]}>
                  {item.name}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
}
