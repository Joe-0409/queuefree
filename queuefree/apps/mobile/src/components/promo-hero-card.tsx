import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { mobileTheme } from "@queuefree/ui-tokens";
import { PromoBadge } from "./promo-badge";
import { PrimaryButton } from "./primary-button";

type HeroChip = {
  label: string;
  value: string;
};

type PromoHeroCardProps = {
  eyebrow?: string;
  title: string;
  description: string;
  chips?: HeroChip[];
  primaryCtaLabel?: string;
  onPrimaryPress?: () => void;
  secondaryCtaLabel?: string;
  onSecondaryPress?: () => void;
  footer?: ReactNode;
};

export function PromoHeroCard({
  eyebrow = "QueueFree",
  title,
  description,
  chips = [],
  primaryCtaLabel,
  onPrimaryPress,
  secondaryCtaLabel,
  onSecondaryPress,
  footer
}: PromoHeroCardProps) {
  return (
    <View style={styles.shell}>
      <View style={styles.accentOne} />
      <View style={styles.accentTwo} />
      <View style={styles.content}>
        <PromoBadge label={eyebrow} />
        <View style={styles.copy}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        {chips.length > 0 ? (
          <View style={styles.chipRow}>
            {chips.map((chip) => (
              <View key={`${chip.label}-${chip.value}`} style={styles.chip}>
                <Text style={styles.chipLabel}>{chip.label}</Text>
                <Text style={styles.chipValue}>{chip.value}</Text>
              </View>
            ))}
          </View>
        ) : null}
        {(primaryCtaLabel || secondaryCtaLabel) ? (
          <View style={styles.actions}>
            {primaryCtaLabel ? <PrimaryButton label={primaryCtaLabel} variant="promo" size="lg" onPress={onPrimaryPress} /> : null}
            {secondaryCtaLabel ? <PrimaryButton label={secondaryCtaLabel} variant="secondary" size="lg" onPress={onSecondaryPress} /> : null}
          </View>
        ) : null}
        {footer ? <View style={styles.footer}>{footer}</View> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    overflow: "hidden",
    borderRadius: mobileTheme.radius.xl,
    backgroundColor: mobileTheme.promo.softBackground,
    borderWidth: 1,
    borderColor: "rgba(255, 138, 112, 0.22)",
    shadowColor: "#FB923C",
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2
  },
  content: {
    padding: mobileTheme.spacing.lg,
    gap: mobileTheme.spacing.md
  },
  accentOne: {
    position: "absolute",
    top: -12,
    right: -24,
    width: 168,
    height: 168,
    borderRadius: 999,
    backgroundColor: "rgba(255, 138, 112, 0.20)"
  },
  accentTwo: {
    position: "absolute",
    bottom: -36,
    left: -26,
    width: 150,
    height: 150,
    borderRadius: 999,
    backgroundColor: "rgba(255, 177, 109, 0.20)"
  },
  copy: {
    gap: mobileTheme.spacing.sm
  },
  title: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "800",
    color: mobileTheme.colors.textPrimary
  },
  description: {
    color: mobileTheme.colors.textSecondary,
    fontSize: 14,
    lineHeight: 21
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: mobileTheme.spacing.sm
  },
  chip: {
    minWidth: 96,
    borderRadius: mobileTheme.radius.lg,
    backgroundColor: "rgba(255,255,255,0.74)",
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 2
  },
  chipLabel: {
    fontSize: 11,
    color: mobileTheme.colors.textMuted,
    fontWeight: "700",
    textTransform: "uppercase"
  },
  chipValue: {
    fontSize: 14,
    fontWeight: "800",
    color: mobileTheme.promo.strongTextOnColor
  },
  actions: {
    gap: mobileTheme.spacing.sm
  },
  footer: {
    gap: mobileTheme.spacing.sm
  }
});
