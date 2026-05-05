import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { GestureResponderEvent, Pressable, Text, View } from "react-native";
import { colors, globalStyles } from "../styles/globalStyles";

interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  deletable?: boolean;
  onDelete?: () => void;
  color?: string;
  style?: any;
}

export default function Chip({
  label,
  selected = false,
  onPress,
  deletable = false,
  onDelete,
  color,
  style,
}: ChipProps) {
  const chipBackgroundColor = selected
    ? colors.primary
    : color || colors.gray200;

  return (
    <Pressable
      style={[
        globalStyles.chip,
        selected && globalStyles.chipSelected,
        color && !selected && { backgroundColor: color },
        style,
      ]}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={[globalStyles.rowCenter, { gap: 6 }]}>
        <Text
          style={[
            globalStyles.chipText,
            selected && globalStyles.chipTextSelected,
            color && !selected && { color: colors.white },
          ]}
        >
          {label}
        </Text>
        {deletable && (
          <Pressable onPress={onDelete}>
            <MaterialIcons
              name="close"
              size={16}
              color={selected ? colors.white : colors.gray700}
            />
          </Pressable>
        )}
      </View>
    </Pressable>
  );
}
