import { StyleSheet, Text, View } from "react-native";
import { mobileTheme } from "@queuefree/ui-tokens";

type PromoBadgeProps = {
  label: string;
  tone?: "promo" | "neutral";
};

export function PromoBadge({ label, tone = "promo" }: PromoBadgeProps) {
  return (
    <View style={[styles.base, tone === "promo" ? styles.promo : styles.neutral]}>
      <Text style={[styles.text, tone === "promo" ? styles.promoText : styles.neutralText]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignSelf: "flex-start",
    minHeight: 30,
    paddingHorizontal: 12,
    borderRadius: mobileTheme.radius.pill,
    justifyContent: "center"
  },
  promo: {
    backgroundColor: mobileTheme.promo.badgeBackground
  },
  neutral: {
    backgroundColor: mobileTheme.colors.surfaceMuted
  },
  text: {
    fontSize: 12,
    fontWeight: "800"
  },
  promoText: {
    color: mobileTheme.promo.badgeText
  },
  neutralText: {
    color: mobileTheme.colors.textSecondary
  }
});
