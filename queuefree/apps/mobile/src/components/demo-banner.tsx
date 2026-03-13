import { StyleSheet, Text, View } from "react-native";
import { mobileTheme } from "@queuefree/ui-tokens";
import { getMobileReadAdapterStatusSummary } from "../adapters/mobile-read-adapter.resolve";
import { getMobileWriteAdapterStatusSummary } from "../adapters/mobile-write-adapter.resolve";
import { getRuntimeConfigAdapterStatusSummary } from "../adapters/runtime-config-adapter.resolve";

export function DemoBanner() {
  const screenDataStatus = getMobileReadAdapterStatusSummary();
  const runtimeConfigStatus = getRuntimeConfigAdapterStatusSummary();
  const writeStatus = getMobileWriteAdapterStatusSummary();

  return (
    <View style={styles.banner}>
      <Text style={styles.title}>Generated bridge UI</Text>
      <Text style={styles.text}>
        Screen data: {screenDataStatus.screenDataMode} · Runtime config: {runtimeConfigStatus.runtimeConfigMode} · Write bridge: {writeStatus.writeDataMode} · api-client:{" "}
        {screenDataStatus.apiClientRuntimeMode}
      </Text>
      <Text style={styles.text}>
        Bridge coverage — screens: {screenDataStatus.bridgeCoverage.wired}/{screenDataStatus.bridgeCoverage.total} · runtime config:{" "}
        {runtimeConfigStatus.bridgeCoverage.wired}/{runtimeConfigStatus.bridgeCoverage.total} · write: {writeStatus.bridgeCoverage.wired}/{writeStatus.bridgeCoverage.total}
      </Text>
      {[...screenDataStatus.reasons.slice(0, 1), ...writeStatus.reasons.slice(0, 1)].map((reason) => (
        <Text key={reason} style={styles.bullet}>
          • {reason}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: mobileTheme.colors.surface,
    borderRadius: mobileTheme.radius.lg,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    padding: mobileTheme.spacing.md,
    gap: mobileTheme.spacing.xs
  },
  title: {
    color: mobileTheme.colors.textPrimary,
    fontWeight: "800"
  },
  text: {
    color: mobileTheme.colors.textSecondary,
    fontSize: 13,
    lineHeight: 18
  },
  bullet: {
    color: mobileTheme.colors.textSecondary,
    fontSize: 12,
    lineHeight: 17
  }
});
