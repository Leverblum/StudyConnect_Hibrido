import React, { useState } from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";
import { colors, globalStyles } from "../styles/globalStyles";

interface CustomInputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: any;
}

export default function CustomInput({
  label,
  error,
  containerStyle,
  ...props
}: CustomInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[globalStyles.inputContainer, containerStyle]}>
      {label && <Text style={globalStyles.inputLabel}>{label}</Text>}
      <TextInput
        style={[
          globalStyles.input,
          isFocused && globalStyles.inputFocused,
          error && globalStyles.inputError,
        ]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholderTextColor={colors.gray500}
        {...props}
      />
      {error && <Text style={globalStyles.textError}>{error}</Text>}
    </View>
  );
}
