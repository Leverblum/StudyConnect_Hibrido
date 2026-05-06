import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { colors, globalStyles } from "../styles/globalStyles";
import { Activity } from "../types/Task";

interface ActivityItemProps {
  activity: Activity;
  onToggle: () => void;
  onDelete: () => void;
  onPress?: () => void;
  showSubject?: boolean;
  subjectName?: string;
  subjectColor?: string;
}

export default function TaskItem({
  activity,
  onToggle,
  onDelete,
  onPress,
  showSubject = false,
  subjectName,
  subjectColor,
}: ActivityItemProps) {
  const isCompleted = activity.status === "completed";
  const isOverdue = new Date(activity.due_date) < new Date() && !isCompleted;

  return (
    <Pressable
      style={[
        globalStyles.listItem,
        globalStyles.listItemCard,
        isCompleted && { opacity: 0.6 },
      ]}
      onPress={onPress}
    >
      <Pressable onPress={onToggle} style={{ marginRight: 12 }}>
        <MaterialIcons
          name={isCompleted ? "check-circle" : "radio-button-unchecked"}
          size={24}
          color={isCompleted ? colors.success : colors.gray400}
        />
      </Pressable>

      <View style={[globalStyles.flexOne, { marginLeft: 8 }]}>
        <Text
          style={[
            globalStyles.textBold,
            isCompleted && { textDecorationLine: "line-through" },
            isOverdue && !isCompleted && { color: colors.error },
          ]}
        >
          {activity.title}
        </Text>

        {activity.description && (
          <Text style={[globalStyles.textSmall, { marginTop: 4 }]}>
            {activity.description}
          </Text>
        )}

        {showSubject && subjectName && (
          <Text
            style={[
              globalStyles.textSmall,
              { marginTop: 4, color: subjectColor || colors.primary },
            ]}
          >
            {subjectName}
          </Text>
        )}

        <View style={[globalStyles.rowCenter, { marginTop: 6, gap: 8 }]}>
          <Text style={globalStyles.textSmall}>
            {new Date(activity.due_date).toLocaleDateString()}
          </Text>
          {isOverdue && !isCompleted && (
            <Text style={[globalStyles.textSmall, { color: colors.error }]}>
              • Vencida
            </Text>
          )}
        </View>
      </View>

      <Pressable onPress={onDelete} style={{ marginLeft: 12, padding: 8 }}>
        <MaterialIcons name="delete-outline" size={20} color={colors.error} />
      </Pressable>
    </Pressable>
  );
}
