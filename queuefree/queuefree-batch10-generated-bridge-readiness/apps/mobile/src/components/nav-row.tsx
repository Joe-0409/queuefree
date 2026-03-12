import { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { mobileTheme } from "@queuefree/ui-tokens";

type NavRowProps = {
  label: string;
  description?: string;
  rightSlot?: ReactNode;
  onPress?: () => void;
};

export function NavRow({ label, description, rightSlot, onPress }: NavRowProps) {
  return (
    <Pressable onPress={onPress} style={styles.row}>
      <View style={styles.textBox}>
        <Text style={styles.label}>{label}</Text>
        {description ? <Text style={styles.description}>{description}</Text> : null}
      </View>
      <View style={styles.right}>
        {rightSlot}
        <Text style={styles.chevron}>›</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: 56,
    borderRadius: mobileTheme.radius.md,
    paddingHorizontal: mobileTheme.spacing.md,
    paddingVertical: mobileTheme.spacing.sm,
    backgroundColor: mobileTheme.colors.surface,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: mobileTheme.spacing.md
  },
  textBox: {
    flex: 1,
    gap: 4
  },
  label: {
    color: mobileTheme.colors.textPrimary,
    fontWeight: "600",
    fontSize: 15
  },
  description: {
    color: mobileTheme.colors.textSecondary,
    fontSize: 13,
    lineHeight: 18
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: mobileTheme.spacing.xs
  },
  chevron: {
    fontSize: 20,
    color: mobileTheme.colors.textMuted
  }
});
