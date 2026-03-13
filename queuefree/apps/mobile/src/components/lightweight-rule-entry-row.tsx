import { Pressable, StyleSheet, Text, View } from "react-native";
import { mobileTheme } from "@queuefree/ui-tokens";
import { PromoBadge } from "./promo-badge";

type LightweightRuleEntryRowProps = {
  title: string;
  description: string;
  badgeLabel?: string;
  onPress?: () => void;
};

export function LightweightRuleEntryRow({
  title,
  description,
  badgeLabel = "Rule center",
  onPress
}: LightweightRuleEntryRowProps) {
  return (
    <Pressable onPress={onPress} style={styles.row}>
      <View style={styles.copy}>
        <PromoBadge label={badgeLabel} tone="neutral" />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: 88,
    borderRadius: mobileTheme.radius.xl,
    backgroundColor: mobileTheme.colors.surface,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    padding: mobileTheme.spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: mobileTheme.spacing.sm
  },
  copy: {
    flex: 1,
    gap: 8
  },
  title: {
    color: mobileTheme.colors.textPrimary,
    fontSize: 16,
    fontWeight: "800"
  },
  description: {
    color: mobileTheme.colors.textSecondary,
    fontSize: 13,
    lineHeight: 19
  },
  chevron: {
    fontSize: 22,
    color: mobileTheme.colors.textMuted
  }
});
