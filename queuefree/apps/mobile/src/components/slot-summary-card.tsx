import { StyleSheet, Text, View } from "react-native";
import { mobileTheme } from "@queuefree/ui-tokens";
import { PrimaryButton } from "./primary-button";
import { PromoBadge } from "./promo-badge";

type SlotSummaryCardProps = {
  nextSlotLabel?: string | null;
  helper: string;
  actionLabel?: string;
  actionLoading?: boolean;
  actionDisabled?: boolean;
  onActionPress?: () => void;
};

export function SlotSummaryCard({
  nextSlotLabel,
  helper,
  actionLabel,
  actionLoading = false,
  actionDisabled = false,
  onActionPress
}: SlotSummaryCardProps) {
  const hasSlot = Boolean(nextSlotLabel);

  return (
    <View style={styles.card}>
      <View style={styles.copy}>
        <PromoBadge label={hasSlot ? "Settlement slot" : "Slot fallback"} tone="neutral" />
        <Text style={styles.title}>{hasSlot ? nextSlotLabel : "Slot timing unavailable"}</Text>
        <Text style={styles.description}>{helper}</Text>
      </View>
      {actionLabel ? (
        <PrimaryButton label={actionLabel} variant="secondary" loading={actionLoading} disabled={actionDisabled} onPress={onActionPress} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: mobileTheme.radius.xl,
    backgroundColor: mobileTheme.colors.surface,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    padding: mobileTheme.spacing.md,
    gap: mobileTheme.spacing.sm
  },
  copy: {
    gap: 8
  },
  title: {
    color: mobileTheme.colors.textPrimary,
    fontSize: 18,
    fontWeight: "800"
  },
  description: {
    color: mobileTheme.colors.textSecondary,
    fontSize: 13,
    lineHeight: 19
  }
});
