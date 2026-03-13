import { StyleSheet, Text, View } from "react-native";
import { mobileTheme } from "@queuefree/ui-tokens";
import { formatMinorMoney } from "@queuefree/shared";
import { PrimaryButton } from "./primary-button";
import { PromoBadge } from "./promo-badge";

type WalletHeroCardProps = {
  availableMinor: number;
  pendingMinor: number;
  frozenMinor: number;
  activationLabel: string;
  onWithdrawPress?: () => void;
};

export function WalletHeroCard({
  availableMinor,
  pendingMinor,
  frozenMinor,
  activationLabel,
  onWithdrawPress
}: WalletHeroCardProps) {
  return (
    <View style={styles.shell}>
      <View style={styles.header}>
        <View style={styles.copy}>
          <PromoBadge label="Wallet summary" />
          <Text style={styles.title}>Balances that matter</Text>
          <Text style={styles.description}>{activationLabel}</Text>
        </View>
      </View>

      <View style={styles.metricGrid}>
        <Metric label="Available" value={formatMinorMoney(availableMinor)} strong />
        <Metric label="Pending" value={formatMinorMoney(pendingMinor)} />
        <Metric label="Frozen" value={formatMinorMoney(frozenMinor)} />
      </View>

      <PrimaryButton
        label="Withdraw"
        variant="promo"
        size="lg"
        onPress={onWithdrawPress}
      />
    </View>
  );
}

function Metric({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <View style={[styles.metricCard, strong ? styles.metricCardStrong : null]}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    borderRadius: mobileTheme.radius.xl,
    backgroundColor: "#FFF6F1",
    borderWidth: 1,
    borderColor: "rgba(255, 138, 112, 0.20)",
    padding: mobileTheme.spacing.lg,
    gap: mobileTheme.spacing.md
  },
  header: {
    gap: mobileTheme.spacing.sm
  },
  copy: {
    gap: mobileTheme.spacing.sm
  },
  title: {
    fontSize: 26,
    lineHeight: 32,
    fontWeight: "800",
    color: mobileTheme.colors.textPrimary
  },
  description: {
    color: mobileTheme.colors.textSecondary,
    fontSize: 14,
    lineHeight: 20
  },
  metricGrid: {
    gap: mobileTheme.spacing.sm
  },
  metricCard: {
    borderRadius: mobileTheme.radius.lg,
    backgroundColor: mobileTheme.colors.surface,
    borderWidth: 1,
    borderColor: "rgba(255, 138, 112, 0.16)",
    padding: mobileTheme.spacing.md,
    gap: 4
  },
  metricCardStrong: {
    borderColor: "rgba(255, 138, 112, 0.32)"
  },
  metricLabel: {
    color: mobileTheme.colors.textSecondary,
    fontSize: 12,
    fontWeight: "700"
  },
  metricValue: {
    color: mobileTheme.colors.textPrimary,
    fontSize: 22,
    lineHeight: 26,
    fontWeight: "800"
  }
});
