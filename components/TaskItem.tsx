import { View, Text, TouchableOpacity } from "react-native";
import { Task } from "../types/Task";

interface Props {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
}

export default function TaskItem({ task, onToggle, onDelete }: Props) {
  return (
    <View style={{ 
      padding: 15, 
      backgroundColor: "white", 
      marginBottom: 10, 
      borderRadius: 8 
    }}>
      <Text style={{ 
        textDecorationLine: task.completed ? "line-through" : "none"
      }}>
        {task.title}
      </Text>

      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <TouchableOpacity onPress={onToggle}>
          <Text style={{ marginRight: 20 }}>✔</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onDelete}>
          <Text>🗑</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}