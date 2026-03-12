import { Pressable, StyleSheet, Text, View } from "react-native";
import { mobileTheme } from "@queuefree/ui-tokens";

type CheckboxRowProps = {
  checked: boolean;
  onPress: () => void;
  label: string;
  hint?: string;
};

export function CheckboxRow({ checked, onPress, label, hint }: CheckboxRowProps) {
  return (
    <Pressable onPress={onPress} style={styles.row}>
      <View style={[styles.box, checked ? styles.boxChecked : null]}>
        {checked ? <Text style={styles.checkMark}>✓</Text> : null}
      </View>
      <View style={styles.textBox}>
        <Text style={styles.label}>{label}</Text>
        {hint ? <Text style={styles.hint}>{hint}</Text> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: mobileTheme.spacing.sm
  },
  box: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    backgroundColor: mobileTheme.colors.surface,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2
  },
  boxChecked: {
    backgroundColor: mobileTheme.colors.brand,
    borderColor: mobileTheme.colors.brand
  },
  checkMark: {
    color: "#ffffff",
    fontWeight: "700"
  },
  textBox: {
    flex: 1,
    gap: 4
  },
  label: {
    color: mobileTheme.colors.textPrimary,
    fontSize: 14,
    lineHeight: 20
  },
  hint: {
    color: mobileTheme.colors.textSecondary,
    fontSize: 12,
    lineHeight: 18
  }
});
