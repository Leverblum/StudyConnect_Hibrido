import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
    GestureResponderEvent,
    Pressable,
    Text,
    View,
    ViewProps,
} from "react-native";
import { colors, globalStyles } from "../styles/globalStyles";

interface ListItemProps extends ViewProps {
  title: string;
  subtitle?: string;
  icon?: string;
  onPress?: (event: GestureResponderEvent) => void;
  onDelete?: () => void;
  rightAction?: React.ReactNode;
  selected?: boolean;
  color?: string;
}

export default function ListItem({
  title,
  subtitle,
  icon,
  onPress,
  onDelete,
  rightAction,
  selected = false,
  color,
  style,
  ...props
}: ListItemProps) {
  return (
    <Pressable
      style={[
        globalStyles.listItem,
        globalStyles.listItemCard,
        selected && globalStyles.listItemSelected,
        style,
      ]}
      onPress={onPress}
      disabled={!onPress}
      {...props}
    >
      {icon && (
        <MaterialIcons
          name={icon as any}
          size={24}
          color={color || colors.primary}
        />
      )}
      <View style={globalStyles.listItemContent}>
        <Text style={globalStyles.textBold}>{title}</Text>
        {subtitle && <Text style={globalStyles.textSecondary}>{subtitle}</Text>}
      </View>
      {rightAction && rightAction}
      {onDelete && !rightAction && (
        <Pressable onPress={onDelete}>
          <MaterialIcons name="delete" size={20} color={colors.error} />
        </Pressable>
      )}
    </Pressable>
  );
}
