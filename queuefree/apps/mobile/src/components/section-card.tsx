import { PropsWithChildren, ReactNode } from "react";
import { StyleSheet, Text, View, type ViewStyle } from "react-native";
import { mobileTheme } from "@queuefree/ui-tokens";

type SectionCardProps = PropsWithChildren<{
  title?: string;
  description?: string;
  rightSlot?: ReactNode;
  variant?: "default" | "muted";
  style?: ViewStyle;
}>;

export function SectionCard({
  children,
  title,
  description,
  rightSlot,
  variant = "default",
  style
}: SectionCardProps) {
  return (
    <View style={[styles.card, variant === "muted" ? styles.cardMuted : null, style]}>
      {title || description || rightSlot ? (
        <View style={styles.header}>
          <View style={styles.headerText}>
            {title ? <Text style={styles.title}>{title}</Text> : null}
            {description ? <Text style={styles.description}>{description}</Text> : null}
          </View>
          {rightSlot ? <View>{rightSlot}</View> : null}
        </View>
      ) : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: mobileTheme.colors.surface,
    borderRadius: mobileTheme.radius.xl,
    padding: mobileTheme.spacing.md,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    gap: mobileTheme.spacing.sm,
    shadowColor: "#0F172A",
    shadowOpacity: 0.07,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2
  },
  cardMuted: {
    backgroundColor: mobileTheme.colors.surfaceMuted
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: mobileTheme.spacing.md
  },
  headerText: {
    flex: 1,
    gap: mobileTheme.spacing.xs
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: mobileTheme.colors.textPrimary
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
    color: mobileTheme.colors.textSecondary
  }
});
