import { StyleSheet, Text, View } from "react-native";
import { mobileTheme } from "@queuefree/ui-tokens";

type KeyValueRowProps = {
  label: string;
  value: string;
  emphasize?: boolean;
};

export function KeyValueRow({ label, value, emphasize = false }: KeyValueRowProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, emphasize ? styles.emphasize : null]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: mobileTheme.spacing.md
  },
  label: {
    flex: 1,
    color: mobileTheme.colors.textSecondary,
    fontSize: 14
  },
  value: {
    color: mobileTheme.colors.textPrimary,
    fontSize: 14,
    fontWeight: "500",
    textAlign: "right"
  },
  emphasize: {
    fontWeight: "700"
  }
});
