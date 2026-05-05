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
  const isOverdue =
    new Date(activity.dueDate) < new Date() && !activity.completed;

  const getPriorityColor = () => {
    switch (activity.priority) {
      case "high":
        return colors.error;
      case "medium":
        return colors.warning;
      case "low":
        return colors.info;
      default:
        return colors.gray400;
    }
  };

  return (
    <Pressable
      style={[
        globalStyles.listItem,
        globalStyles.listItemCard,
        activity.completed && { opacity: 0.6 },
      ]}
      onPress={onPress}
    >
      <Pressable onPress={onToggle} style={{ marginRight: 12 }}>
        <MaterialIcons
          name={activity.completed ? "check-circle" : "radio-button-unchecked"}
          size={24}
          color={activity.completed ? colors.success : colors.gray400}
        />
      </Pressable>

      <View style={[globalStyles.flexOne, { marginLeft: 8 }]}>
        <Text
          style={[
            globalStyles.textBold,
            activity.completed && { textDecorationLine: "line-through" },
            isOverdue && !activity.completed && { color: colors.error },
          ]}
        >
          {activity.title}
        </Text>

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
          {activity.priority && (
            <View
              style={[
                { width: 8, height: 8, borderRadius: 4 },
                { backgroundColor: getPriorityColor() },
              ]}
            />
          )}
          <Text style={globalStyles.textSmall}>
            {new Date(activity.dueDate).toLocaleDateString()}
          </Text>
          {isOverdue && !activity.completed && (
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
