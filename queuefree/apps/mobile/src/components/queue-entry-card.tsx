import { Pressable, StyleSheet, Text, View } from "react-native";
import { formatMinorMoney } from "@queuefree/shared";
import { mobileTheme } from "@queuefree/ui-tokens";
import type { QueueEntryCardModel } from "../models/mobile-screen-models";
import { StatusPill } from "./status-pill";

type QueueEntryCardProps = {
  entry: QueueEntryCardModel;
  statusTone: "brand" | "success" | "warning" | "danger" | "neutral";
  onPress?: () => void;
  variant?: "default" | "compact";
  nextSlotLabel: string;
};

export function QueueEntryCard({
  entry,
  statusTone,
  onPress,
  variant = "default",
  nextSlotLabel
}: QueueEntryCardProps) {
  return (
    <Pressable onPress={onPress} style={[styles.card, variant === "compact" ? styles.cardCompact : null]}>
      <View style={styles.header}>
        <View style={styles.copy}>
          <Text style={styles.title}>{entry.productTitle}</Text>
          <Text style={styles.subtitle}>Order {entry.orderId}</Text>
        </View>
        <StatusPill label={entry.status} tone={statusTone} />
      </View>

      <View style={styles.metrics}>
        <Metric label="Rank" value={entry.currentRank ? `#${entry.currentRank}` : "Not ranked"} />
        <Metric label="Boost" value={String(entry.boostUsed)} />
      </View>

      <View style={styles.footer}>
        <Text style={styles.meta}>Next slot: {nextSlotLabel}</Text>
        <Text style={styles.meta}>Cashback base: {formatMinorMoney(entry.eligibleCashbackMinor)}</Text>
      </View>
    </Pressable>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metricCard}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
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
  cardCompact: {
    gap: 12
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: mobileTheme.spacing.md
  },
  copy: {
    flex: 1,
    gap: 4
  },
  title: {
    color: mobileTheme.colors.textPrimary,
    fontSize: 16,
    fontWeight: "800"
  },
  subtitle: {
    color: mobileTheme.colors.textSecondary,
    fontSize: 13
  },
  metrics: {
    flexDirection: "row",
    gap: mobileTheme.spacing.sm
  },
  metricCard: {
    flex: 1,
    borderRadius: mobileTheme.radius.lg,
    backgroundColor: mobileTheme.colors.surfaceMuted,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 3
  },
  metricLabel: {
    color: mobileTheme.colors.textMuted,
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase"
  },
  metricValue: {
    color: mobileTheme.colors.textPrimary,
    fontSize: 16,
    fontWeight: "800"
  },
  footer: {
    gap: 4
  },
  meta: {
    color: mobileTheme.colors.textSecondary,
    fontSize: 12,
    lineHeight: 17
  }
});
