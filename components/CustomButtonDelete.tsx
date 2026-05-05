import CustomButton from "./CustomButton";

interface CustomButtonDeleteProps {
  title: string;
  onPress: () => void;
}

/**
 * @deprecated Use CustomButton with variant="danger" instead
 * Example: <CustomButton title="Delete" variant="danger" onPress={onPress} />
 */
export default function CustomButtonDelete({
  title,
  onPress,
}: CustomButtonDeleteProps) {
  return <CustomButton title={title} variant="danger" onPress={onPress} />;
}
