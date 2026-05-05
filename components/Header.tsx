import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { colors, globalStyles } from "../styles/globalStyles";

interface HeaderProps {
  title: string;
  subtitle?: string;
  leftAction?: React.ReactNode;
  rightAction?: React.ReactNode;
  onBackPress?: () => void;
}

export default function Header({
  title,
  subtitle,
  leftAction,
  rightAction,
  onBackPress,
}: HeaderProps) {
  return (
    <View style={globalStyles.header}>
      <View style={globalStyles.headerContainer}>
        <View style={globalStyles.rowCenter}>
          {onBackPress && (
            <Pressable onPress={onBackPress} style={{ marginRight: 12 }}>
              <MaterialIcons name="arrow-back" size={24} color={colors.white} />
            </Pressable>
          )}
          <View>
            <Text style={globalStyles.headerTitle}>{title}</Text>
            {subtitle && (
              <Text style={globalStyles.headerSubtitle}>{subtitle}</Text>
            )}
          </View>
        </View>

        <View style={globalStyles.rowCenter}>
          {leftAction && <View style={{ marginRight: 12 }}>{leftAction}</View>}
          {rightAction && rightAction}
        </View>
      </View>
    </View>
  );
}
