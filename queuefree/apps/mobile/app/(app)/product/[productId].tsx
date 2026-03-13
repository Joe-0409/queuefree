import { useMemo, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { formatMinorMoney } from "@queuefree/shared";
import { mobileTheme } from "@queuefree/ui-tokens";
import { DemoBanner } from "../../../src/components/demo-banner";
import { MechanismStepStrip } from "../../../src/components/mechanism-step-strip";
import { PrimaryButton } from "../../../src/components/primary-button";
import { PromoBadge } from "../../../src/components/promo-badge";
import { QueryStateCard } from "../../../src/components/query-state-card";
import { SectionCard } from "../../../src/components/section-card";
import { SlotSummaryCard } from "../../../src/components/slot-summary-card";
import { useRuntimeConfig } from "../../../src/hooks/use-runtime-config";
import { useProductDetailQuery } from "../../../src/queries/use-mobile-queries";

export default function ProductDetailScreen() {
  const params = useLocalSearchParams<{ productId: string | string[] }>();
  const productId = Array.isArray(params.productId) ? params.productId[0] : params.productId || "prod-earbuds";
  const productQuery = useProductDetailQuery(productId);
  const { config } = useRuntimeConfig();
  const [quantity, setQuantity] = useState(1);

  const totalMinor = useMemo(() => (productQuery.data?.priceMinor ?? 0) * quantity, [productQuery.data?.priceMinor, quantity]);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right", "bottom"]}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <DemoBanner />

          {productQuery.isPending ? (
            <QueryStateCard
              mode="loading"
              title="Preparing product detail"
              description="Product detail now reads through the readonly repository-backed query."
            />
          ) : null}

          {productQuery.isError ? (
            <QueryStateCard
              mode="error"
              title="Product detail is unavailable"
              description="Retry the product detail query."
              onRetry={() => {
                void productQuery.refetch();
              }}
            />
          ) : null}

          {productQuery.data ? (
            <>
              <View style={styles.heroMedia}>
                <PromoBadge label="Product detail" />
                <Text style={styles.heroTitle}>{productQuery.data.title}</Text>
                <Text style={styles.heroSubtitle}>{productQuery.data.subtitle}</Text>
              </View>

              <MechanismStepStrip />

              <SectionCard
                title="Product summary"
                description="Large media, strong CTA, and clear rule notes can be absorbed from the reference images without changing the real mechanism."
              >
                <View style={styles.summaryGrid}>
                  <SummaryMetric label="Unit price" value={formatMinorMoney(productQuery.data.priceMinor)} />
                  <SummaryMetric label="Cashback cap" value={formatMinorMoney(productQuery.data.cashbackCapMinor)} />
                </View>
                <Text style={styles.bodyText}>{productQuery.data.stockLabel}</Text>
                <Text style={styles.bodyText}>
                  Quantity changes order money, but one order still creates only one queue seat.
                </Text>
              </SectionCard>

              <SlotSummaryCard
                nextSlotLabel={`Check-in valid for ${config.baseGuardHours} hours`}
                helper={`Top${config.protectZoneSize} stays protected and boost is limited to ${config.boostLimitPerEntry} times per order.`}
              />
            </>
          ) : null}
        </ScrollView>

        {productQuery.data ? (
          <View style={styles.bottomBar}>
            <View style={styles.bottomCopy}>
              <Text style={styles.bottomLabel}>Estimated subtotal</Text>
              <Text style={styles.bottomValue}>{formatMinorMoney(totalMinor)}</Text>
            </View>

            <View style={styles.quantityRow}>
              <PrimaryButton
                label="-"
                variant="secondary"
                fullWidth={false}
                disabled={quantity <= 1}
                onPress={() => setQuantity((value) => Math.max(1, value - 1))}
              />
              <Text style={styles.quantityText}>{quantity}</Text>
              <PrimaryButton
                label="+"
                variant="secondary"
                fullWidth={false}
                disabled={quantity >= config.defaultOrderMaxQty}
                onPress={() => setQuantity((value) => Math.min(config.defaultOrderMaxQty, value + 1))}
              />
            </View>

            <PrimaryButton
              label="Continue to checkout"
              variant="promo"
              size="lg"
              onPress={() =>
                router.push({
                  pathname: "/(app)/checkout/[productId]",
                  params: { productId, quantity: String(quantity) }
                })
              }
            />
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

function SummaryMetric({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metricCard}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: mobileTheme.colors.background
  },
  container: {
    flex: 1
  },
  content: {
    padding: mobileTheme.spacing.md,
    paddingBottom: 220,
    gap: mobileTheme.spacing.md
  },
  heroMedia: {
    minHeight: 240,
    borderRadius: mobileTheme.radius.xl,
    backgroundColor: mobileTheme.promo.softBackground,
    padding: mobileTheme.spacing.lg,
    justifyContent: "space-between",
    gap: mobileTheme.spacing.lg,
    borderWidth: 1,
    borderColor: "rgba(255, 138, 112, 0.22)"
  },
  heroTitle: {
    color: mobileTheme.colors.textPrimary,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "800"
  },
  heroSubtitle: {
    color: mobileTheme.colors.textSecondary,
    fontSize: 14,
    lineHeight: 20
  },
  summaryGrid: {
    flexDirection: "row",
    gap: mobileTheme.spacing.sm
  },
  metricCard: {
    flex: 1,
    borderRadius: mobileTheme.radius.lg,
    backgroundColor: mobileTheme.colors.surfaceMuted,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 4
  },
  metricLabel: {
    color: mobileTheme.colors.textMuted,
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase"
  },
  metricValue: {
    color: mobileTheme.colors.textPrimary,
    fontSize: 18,
    fontWeight: "800"
  },
  bodyText: {
    color: mobileTheme.colors.textSecondary,
    fontSize: 13,
    lineHeight: 19
  },
  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: 1,
    borderTopColor: mobileTheme.colors.border,
    backgroundColor: "rgba(255,255,255,0.98)",
    paddingHorizontal: mobileTheme.spacing.md,
    paddingTop: mobileTheme.spacing.md,
    paddingBottom: mobileTheme.spacing.md,
    gap: mobileTheme.spacing.sm
  },
  bottomCopy: {
    gap: 2
  },
  bottomLabel: {
    color: mobileTheme.colors.textSecondary,
    fontSize: 12,
    fontWeight: "700"
  },
  bottomValue: {
    color: mobileTheme.colors.textPrimary,
    fontSize: 22,
    fontWeight: "800"
  },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: mobileTheme.spacing.sm
  },
  quantityText: {
    minWidth: 36,
    textAlign: "center",
    color: mobileTheme.colors.textPrimary,
    fontSize: 18,
    fontWeight: "800"
  }
});
