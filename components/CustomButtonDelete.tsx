import { TouchableOpacity, Text } from "react-native";
import { globalStyles } from "../styles/globalStyles";

interface Props {
  title: string;
  onPress: () => void;
}

export default function CustomButtonDelete({ title, onPress }: Props) {
  return (
    <TouchableOpacity style={globalStyles.buttonDelete} onPress={onPress}>
      <Text style={globalStyles.buttonDeleteText}>{title}</Text>
    </TouchableOpacity>
  );
}
