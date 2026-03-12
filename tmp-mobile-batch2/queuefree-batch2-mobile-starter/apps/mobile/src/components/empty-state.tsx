import { StyleSheet, Text, View } from "react-native";
import { mobileTheme } from "@queuefree/ui-tokens";

type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <View style={styles.box}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: mobileTheme.colors.surfaceMuted,
    borderRadius: mobileTheme.radius.lg,
    padding: mobileTheme.spacing.lg,
    gap: mobileTheme.spacing.xs
  },
  title: {
    fontWeight: "700",
    fontSize: 16,
    color: mobileTheme.colors.textPrimary
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: mobileTheme.colors.textSecondary
  }
});
