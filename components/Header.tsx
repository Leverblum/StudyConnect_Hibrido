import { Text, View } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import LogoutButton from "./LogoutButton";

interface Props {
  title: string;
}

export default function Header({ title }: Props) {
  return (
    <View style={globalStyles.header}>
      <View style={globalStyles.headerContainer}>
        <Text style={globalStyles.headerTitle}>{title}</Text>

        <LogoutButton />
      </View>
    </View>
  );
}
