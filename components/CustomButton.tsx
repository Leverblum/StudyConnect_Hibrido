import React from "react";
import {
    ActivityIndicator,
    GestureResponderEvent,
    Pressable,
    Text,
} from "react-native";
import { colors, globalStyles } from "../styles/globalStyles";

interface CustomButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  variant?: "primary" | "secondary" | "danger" | "success" | "outline";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  loading?: boolean;
  style?: any;
  textStyle?: any;
}

export default function CustomButton({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  style,
  textStyle,
}: CustomButtonProps) {
  const getButtonStyle = () => {
    let baseStyle = globalStyles.button;

    switch (variant) {
      case "secondary":
        return [baseStyle, globalStyles.buttonSecondary];
      case "danger":
        return [baseStyle, globalStyles.buttonDanger];
      case "success":
        return [baseStyle, globalStyles.buttonSuccess];
      case "outline":
        return [baseStyle, globalStyles.buttonOutline];
      default:
        return baseStyle;
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case "small":
        return [globalStyles.buttonSmall];
      case "large":
        return [{ paddingVertical: 16, paddingHorizontal: 24 }];
      default:
        return [];
    }
  };

  const getTextStyle = () => {
    let baseTextStyle = globalStyles.buttonText;

    if (variant === "outline") {
      return [baseTextStyle, globalStyles.buttonOutlineText];
    }

    if (size === "small") {
      return [baseTextStyle, globalStyles.buttonSmallText];
    }

    return [baseTextStyle];
  };

  return (
    <Pressable
      style={({ pressed }) => [
        getButtonStyle(),
        getSizeStyle(),
        disabled && globalStyles.buttonDisabled,
        pressed && { opacity: 0.8 },
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "outline" ? colors.primary : colors.white}
          size="small"
        />
      ) : (
        <Text style={[getTextStyle(), textStyle]}>{title}</Text>
      )}
    </Pressable>
  );
}
