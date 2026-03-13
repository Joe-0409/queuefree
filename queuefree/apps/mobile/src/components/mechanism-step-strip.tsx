import { StyleSheet, Text, View } from "react-native";
import { mobileTheme } from "@queuefree/ui-tokens";

type MechanismStepStripProps = {
  steps?: string[];
};

const defaultSteps = ["Buy", "Join queue", "Wait slot", "Cashback release"];

export function MechanismStepStrip({ steps = defaultSteps }: MechanismStepStripProps) {
  return (
    <View style={styles.row}>
      {steps.map((step, index) => (
        <View key={step} style={styles.stepCard}>
          <View style={styles.indexBubble}>
            <Text style={styles.indexText}>{index + 1}</Text>
          </View>
          <Text style={styles.stepText}>{step}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: mobileTheme.spacing.sm
  },
  stepCard: {
    flexGrow: 1,
    minWidth: 130,
    borderRadius: mobileTheme.radius.lg,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    backgroundColor: mobileTheme.colors.surface,
    padding: mobileTheme.spacing.md,
    gap: 10
  },
  indexBubble: {
    width: 28,
    height: 28,
    borderRadius: 999,
    backgroundColor: mobileTheme.promo.softBackground,
    alignItems: "center",
    justifyContent: "center"
  },
  indexText: {
    color: mobileTheme.promo.badgeText,
    fontWeight: "800"
  },
  stepText: {
    color: mobileTheme.colors.textPrimary,
    fontWeight: "700",
    fontSize: 14
  }
});
