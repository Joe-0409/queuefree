import { StyleSheet, Text, TextInput, View } from "react-native";
import { mobileTheme } from "@queuefree/ui-tokens";

type TextFieldProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  keyboardType?: "default" | "phone-pad" | "number-pad";
  secureTextEntry?: boolean;
  errorText?: string;
};

export function TextField({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  secureTextEntry = false,
  errorText
}: TextFieldProps) {
  return (
    <View style={styles.box}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        style={[styles.input, errorText ? styles.inputError : null]}
        placeholderTextColor={mobileTheme.colors.textMuted}
      />
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    gap: 8
  },
  label: {
    color: mobileTheme.colors.textPrimary,
    fontWeight: "600",
    fontSize: 14
  },
  input: {
    minHeight: 48,
    backgroundColor: mobileTheme.colors.surface,
    borderRadius: mobileTheme.radius.md,
    paddingHorizontal: mobileTheme.spacing.md,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    color: mobileTheme.colors.textPrimary
  },
  inputError: {
    borderColor: mobileTheme.colors.danger
  },
  error: {
    color: mobileTheme.colors.danger,
    fontSize: 12
  }
});
