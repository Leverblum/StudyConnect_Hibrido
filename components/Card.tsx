import React from "react";
import { View, ViewProps } from "react-native";
import { globalStyles } from "../styles/globalStyles";

interface CardProps extends ViewProps {
  children: React.ReactNode;
  variant?: "default" | "large" | "compact";
}

export default function Card({
  children,
  variant = "default",
  style,
  ...props
}: CardProps) {
  const getVariantStyle = () => {
    switch (variant) {
      case "large":
        return globalStyles.cardLarge;
      case "compact":
        return [globalStyles.card, globalStyles.cardCompact];
      default:
        return globalStyles.card;
    }
  };

  return (
    <View style={[getVariantStyle(), style]} {...props}>
      {children}
    </View>
  );
}
