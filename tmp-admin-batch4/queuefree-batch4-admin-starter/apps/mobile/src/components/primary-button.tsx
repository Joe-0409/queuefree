import { ReactNode } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import { mobileTheme } from "@queuefree/ui-tokens";

type PrimaryButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: "brand" | "secondary" | "danger";
  disabled?: boolean;
  loading?: boolean;
  leftSlot?: ReactNode;
};

export function PrimaryButton({
  label,
  onPress,
  variant = "brand",
  disabled = false,
  loading = false,
  leftSlot
}: PrimaryButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        variantStyles[variant],
        isDisabled ? styles.disabled : null,
        pressed && !isDisabled ? styles.pressed : null
      ]}
    >
      {loading ? <ActivityIndicator color="#ffffff" /> : leftSlot}
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 48,
    borderRadius: mobileTheme.radius.md,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: mobileTheme.spacing.sm,
    paddingHorizontal: mobileTheme.spacing.md
  },
  label: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 15
  },
  disabled: {
    opacity: 0.55
  },
  pressed: {
    transform: [{ scale: 0.99 }]
  }
});

const variantStyles = StyleSheet.create({
  brand: {
    backgroundColor: mobileTheme.colors.brand
  },
  secondary: {
    backgroundColor: mobileTheme.colors.textSecondary
  },
  danger: {
    backgroundColor: mobileTheme.colors.danger
  }
});
