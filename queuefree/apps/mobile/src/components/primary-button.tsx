import { ReactNode } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import { mobileTheme } from "@queuefree/ui-tokens";

type PrimaryButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: "brand" | "secondary" | "danger" | "promo";
  size?: "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  leftSlot?: ReactNode;
  fullWidth?: boolean;
};

export function PrimaryButton({
  label,
  onPress,
  variant = "brand",
  size = "md",
  disabled = false,
  loading = false,
  leftSlot,
  fullWidth = true
}: PrimaryButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        sizeStyles[size],
        variantStyles[variant],
        fullWidth ? styles.fullWidth : null,
        isDisabled ? styles.disabled : null,
        pressed && !isDisabled ? styles.pressed : null
      ]}
    >
      {loading ? <ActivityIndicator color="#ffffff" /> : leftSlot}
      <Text style={[styles.label, variant === "secondary" ? styles.labelSecondary : null]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: mobileTheme.radius.lg,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: mobileTheme.spacing.sm,
    paddingHorizontal: mobileTheme.spacing.md
  },
  fullWidth: {
    width: "100%"
  },
  label: {
    color: "#ffffff",
    fontWeight: "800",
    fontSize: 15
  },
  labelSecondary: {
    color: mobileTheme.colors.textPrimary
  },
  disabled: {
    opacity: 0.55
  },
  pressed: {
    transform: [{ scale: 0.99 }]
  }
});

const sizeStyles = StyleSheet.create({
  md: {
    minHeight: 50
  },
  lg: {
    minHeight: 56
  }
});

const variantStyles = StyleSheet.create({
  brand: {
    backgroundColor: mobileTheme.colors.brand
  },
  secondary: {
    backgroundColor: mobileTheme.colors.surface,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border
  },
  danger: {
    backgroundColor: mobileTheme.colors.danger
  },
  promo: {
    backgroundColor: mobileTheme.promo.gradientStart
  }
});
