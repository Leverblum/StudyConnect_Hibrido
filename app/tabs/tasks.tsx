import { View, Text, TextInput, FlatList, TouchableOpacity } from "react-native";
import { useState } from "react";
import { globalStyles } from "../../styles/globalStyles";
import CustomButton from "../../components/CustomButton";
import CustomButtonDelete from "../../components/CustomButtonDelete";

export default function Tasks() {

  const [task, setTask] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [tasks, setTasks] = useState<
    { id: string; title: string; subject: string }[]
  >([]);

  const subjects = [
    { id: "1", name: "Matemáticas" },
    { id: "2", name: "Historia" },
    { id: "3", name: "Ciencias" },
  ];

  const addTask = () => {
    if (!task || !selectedSubject) return;

    const newTask = {
      id: Date.now().toString(),
      title: task,
      subject: selectedSubject,
    };

    setTasks([...tasks, newTask]);
    setTask("");
    setSelectedSubject("");
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <View style={globalStyles.screen}>

      <View style={globalStyles.header}>
        <Text style={globalStyles.headerTitle}>Tareas</Text>
      </View>

      <View style={globalStyles.content}>

        <View style={[globalStyles.card, globalStyles.cardCompact]}>
          <Text style={globalStyles.cardSmallTitle}>
            Nueva Tarea
          </Text>

          <FlatList
            data={subjects}
            horizontal
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ marginBottom: 10 }}
            renderItem={({ item }) => {

              const isSelected = selectedSubject === item.name;

              return (
                <TouchableOpacity
                  onPress={() => setSelectedSubject(item.name)}
                  style={[
                    globalStyles.chip,
                    isSelected && globalStyles.chipSelected
                  ]}
                >
                  <Text
                    style={[
                      globalStyles.chipText,
                      isSelected && globalStyles.chipTextSelected
                    ]}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />

          <TextInput
            placeholder="Escribe una tarea..."
            style={[globalStyles.input, globalStyles.inputSmallMargin]}
            value={task}
            onChangeText={setTask}
          />

          <CustomButton title="Agregar" onPress={addTask} />
        </View>

        <View style={globalStyles.flexOne}>
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={[globalStyles.card, globalStyles.cardCompact]}>
                
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  
                  <CustomButtonDelete
                    title="♻"
                    onPress={() => deleteTask(item.id)}
                  />

                  <Text
                    style={[
                      globalStyles.cardSmallTitle,
                      { marginLeft: 10 }
                    ]}
                  >
                    {item.title}
                  </Text>

                </View>

                <Text style={globalStyles.textSecondary}>
                  {item.subject}
                </Text>

              </View>
            )}
          />
        </View>

      </View>
    </View>
  );
}