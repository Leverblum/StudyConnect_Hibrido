import React from "react";
import { Text, View } from "react-native";
import { colors, globalStyles } from "../styles/globalStyles";

interface BadgeProps {
  label: string;
  variant?: "primary" | "success" | "warning" | "error" | "info";
  size?: "small" | "medium";
}

export default function Badge({
  label,
  variant = "primary",
  size = "medium",
}: BadgeProps) {
  const getBackgroundColor = () => {
    switch (variant) {
      case "success":
        return colors.success;
      case "warning":
        return colors.warning;
      case "error":
        return colors.error;
      case "info":
        return colors.info;
      default:
        return colors.primary;
    }
  };

  return (
    <View
      style={[
        globalStyles.badge,
        size === "small" && globalStyles.badgeSmall,
        { backgroundColor: getBackgroundColor() },
      ]}
    >
      <Text
        style={[globalStyles.badgeText, size === "small" && { fontSize: 10 }]}
      >
        {label}
      </Text>
    </View>
  );
}
