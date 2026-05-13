import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker, {
    DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { useRef, useState } from "react";
import { Platform, Pressable, Text, TextInput, View } from "react-native";
import { colors, globalStyles } from "../styles/globalStyles";

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
  const [inputValue, setInputValue] = useState("");
  const isWeb = Platform.OS === "web";
  const inputRef = useRef<HTMLInputElement>(null);

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (!isWeb) {
      setShow(Platform.OS === "ios");
    }
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  const showDatepicker = () => {
    if (!isWeb) {
      setShow(true);
    } else {
      // En web, enfoca el input date nativo
      if (inputRef.current) {
        inputRef.current.click();
      }
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateForInput = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const parseIsoDateString = (dateString: string): Date | null => {
    if (!dateString || typeof dateString !== "string") {
      return null;
    }

    const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!isoDateRegex.test(dateString)) {
      return null;
    }

    const [year, month, day] = dateString.split("-").map(Number);
    if (
      year < 1900 ||
      year > 2100 ||
      month < 1 ||
      month > 12 ||
      day < 1 ||
      day > 31
    ) {
      return null;
    }

    const date = new Date(year, month - 1, day);
    return Number.isNaN(date.getTime()) ? null : date;
  };

  const handleWebDateChange = (dateString: string) => {
    setInputValue(dateString);
    const date = parseIsoDateString(dateString);
    if (date) {
      onChange(date);
    }
  };

  if (isWeb) {
    // Web: input date nativo del navegador
    return (
      <View style={{ marginBottom: 16 }}>
        <Text style={globalStyles.inputLabel}>{label}</Text>
        <View
          style={[
            globalStyles.input,
            error && globalStyles.inputError,
            {
              flexDirection: "row",
              alignItems: "center",
              paddingRight: 12,
            },
          ]}
        >
          <TextInput
            ref={inputRef as any}
            style={[globalStyles.input, { flex: 1, paddingRight: 0 }]}
            placeholder="YYYY-MM-DD"
            value={formatDateForInput(value)}
            onChangeText={handleWebDateChange}
            inputMode="none"
            // @ts-ignore - React Native Web supports type="date"
            type="date"
          />
          <MaterialIcons
            name="calendar-today"
            size={20}
            color={colors.gray500}
          />
        </View>
        {error ? <Text style={globalStyles.errorText}>{error}</Text> : null}
      </View>
    );
  }

  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={globalStyles.inputLabel}>{label}</Text>
      <Pressable
        style={[
          globalStyles.input,
          error && globalStyles.inputError,
          {
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          },
        ]}
        onPress={showDatepicker}
      >
        <Text style={globalStyles.inputText}>{formatDate(value)}</Text>
        <MaterialIcons name="calendar-today" size={20} color={colors.primary} />
      </Pressable>
      {error ? <Text style={globalStyles.errorText}>{error}</Text> : null}

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
