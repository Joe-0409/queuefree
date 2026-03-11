import { StyleSheet, Text, View } from "react-native";
import { mobileTheme } from "@queuefree/ui-tokens";

export function DemoBanner() {
  return (
    <View style={styles.banner}>
      <Text style={styles.title}>Demo mode</Text>
      <Text style={styles.text}>
        This screen uses local mock data for now. Replace it with generated OpenAPI SDK calls after backend exports OpenAPI.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: mobileTheme.colors.infoSoft,
    borderRadius: mobileTheme.radius.md,
    padding: mobileTheme.spacing.md,
    gap: mobileTheme.spacing.xs
  },
  title: {
    color: mobileTheme.colors.info,
    fontWeight: "700"
  },
  text: {
    color: mobileTheme.colors.textSecondary,
    fontSize: 13,
    lineHeight: 18
  }
});
