import DateTimePicker, {
    DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Platform, Pressable, Text, View } from "react-native";
import { globalStyles } from "../styles/globalStyles";

interface DatePickerProps {
  label: string;
  value: Date;
  onChange: (date: Date) => void;
  error?: string;
  minimumDate?: Date;
  maximumDate?: Date;
}

export default function DatePicker({
  label,
  value,
  onChange,
  error,
  minimumDate,
  maximumDate,
}: DatePickerProps) {
  const [show, setShow] = useState(false);

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShow(Platform.OS === "ios");
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={globalStyles.inputLabel}>{label}</Text>
      <Pressable
        style={[
          globalStyles.input,
          error && globalStyles.inputError,
          { justifyContent: "center" },
        ]}
        onPress={showDatepicker}
      >
        <Text style={globalStyles.inputText}>{formatDate(value)}</Text>
      </Pressable>
      {error && <Text style={globalStyles.errorText}>{error}</Text>}

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={value}
          mode="date"
          is24Hour={true}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onDateChange}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
        />
      )}
    </View>
  );
}
