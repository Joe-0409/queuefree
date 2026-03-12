import { PropsWithChildren, ReactNode } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { mobileTheme } from "@queuefree/ui-tokens";

type ScreenProps = PropsWithChildren<{
  title: string;
  subtitle?: string;
  rightSlot?: ReactNode;
  scrollable?: boolean;
}>;

export function Screen({
  children,
  title,
  subtitle,
  rightSlot,
  scrollable = true
}: ScreenProps) {
  const content = (
    <View style={styles.inner}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
        {rightSlot ? <View>{rightSlot}</View> : null}
      </View>
      {children}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      {scrollable ? <ScrollView contentContainerStyle={styles.content}>{content}</ScrollView> : <View style={styles.content}>{content}</View>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: mobileTheme.colors.background
  },
  content: {
    flexGrow: 1
  },
  inner: {
    padding: mobileTheme.spacing.md,
    gap: mobileTheme.spacing.md
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
    fontSize: 28,
    fontWeight: "700",
    color: mobileTheme.colors.textPrimary
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: mobileTheme.colors.textSecondary
  }
});
