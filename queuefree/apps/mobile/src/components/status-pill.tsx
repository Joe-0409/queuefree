import { StyleSheet, Text, View } from "react-native";
import { mobileTheme } from "@queuefree/ui-tokens";

type StatusPillProps = {
  label: string;
  tone?: "brand" | "success" | "warning" | "danger" | "neutral";
};

export function StatusPill({ label, tone = "neutral" }: StatusPillProps) {
  return (
    <View style={[styles.base, toneStyles[tone].container]}>
      <Text style={[styles.text, toneStyles[tone].text]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: 10,
    minHeight: 28,
    borderRadius: mobileTheme.radius.pill,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start"
  },
  text: {
    fontSize: 12,
    fontWeight: "700"
  }
});

const toneStyles = {
  brand: StyleSheet.create({
    container: { backgroundColor: mobileTheme.colors.brandSoft },
    text: { color: mobileTheme.colors.brand }
  }),
  success: StyleSheet.create({
    container: { backgroundColor: mobileTheme.colors.successSoft },
    text: { color: mobileTheme.colors.success }
  }),
  warning: StyleSheet.create({
    container: { backgroundColor: mobileTheme.colors.warningSoft },
    text: { color: mobileTheme.colors.warning }
  }),
  danger: StyleSheet.create({
    container: { backgroundColor: mobileTheme.colors.dangerSoft },
    text: { color: mobileTheme.colors.danger }
  }),
  neutral: StyleSheet.create({
    container: { backgroundColor: mobileTheme.colors.surfaceMuted },
    text: { color: mobileTheme.colors.textSecondary }
  })
} as const;
