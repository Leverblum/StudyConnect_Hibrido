import { View, Text, TextInput, FlatList } from "react-native";
import { useState } from "react";
import { globalStyles } from "../../styles/globalStyles";
import CustomButton from "../../components/CustomButton";
import { Subject } from "../../types/Subject";
import { Button } from "@react-navigation/elements";
import CustomButtonDelete from "@/components/CustomButtonDelete";

export default function Subjects() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [name, setName] = useState("");

  const addSubject = () => {
    if (!name) return;

    const newSubject: Subject = {
      id: Date.now().toString(),
      name,
      color: "#4A90E2",
    };

    setSubjects([...subjects, newSubject]);
    setName("");
  };

  return (
    <View style={globalStyles.screen}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.headerTitle}>Materias</Text>
      </View>

      <View style={globalStyles.content}>
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

        <FlatList
          data={subjects}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={globalStyles.card}>
              <View style={globalStyles.cardSpace}>
                <CustomButtonDelete
                  title="♻"
                  onPress={() =>
                    setSubjects(subjects.filter((s) => s.id !== item.id))
                  }
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
