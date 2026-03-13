import { router } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { formatDateTime } from "@queuefree/shared";
import { mobileTheme } from "@queuefree/ui-tokens";
import { DemoBanner } from "../../../src/components/demo-banner";
import { LightweightRuleEntryRow } from "../../../src/components/lightweight-rule-entry-row";
import { PendingCheckoutCard } from "../../../src/components/pending-checkout-card";
import { ProductCard } from "../../../src/components/product-card";
import { PromoHeroCard } from "../../../src/components/promo-hero-card";
import { QueryStateCard } from "../../../src/components/query-state-card";
import { SlotSummaryCard } from "../../../src/components/slot-summary-card";
import { usePendingCheckoutAssistant, useActivePendingCheckoutSessions } from "../../../src/hooks/use-pending-checkout";
import { useRuntimeConfig } from "../../../src/hooks/use-runtime-config";
import { useHomeScreenQuery } from "../../../src/queries/use-mobile-queries";

export default function HomeTabScreen() {
 const { config } = useRuntimeConfig();
 const homeQuery = useHomeScreenQuery();
 const pendingSessions = useActivePendingCheckoutSessions();
 const latestPendingSession = pendingSessions[0] ?? null;
 const pendingAssistant = usePendingCheckoutAssistant(latestPendingSession);

 const products = homeQuery.data?.products ?? [];
 const nextSlotLabel = homeQuery.data?.nextSlotAt ? formatDateTime(homeQuery.data.nextSlotAt) : null;

 return (
 <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
 <FlatList
 data={products}
 keyExtractor={(item) => item.id}
 contentContainerStyle={styles.content}
 ListHeaderComponent={
 <View style={styles.headerContent}>
 <DemoBanner />

 <PromoHeroCard
 eyebrow="Public queue · readonly connected"
 title="Buy a real product, then follow one visible queue"
 description="Use the promo layer only to guide attention. The real logic still stays rules-first: buy, join queue, wait for fixed slot settlement, then release path."
 chips={[
 { label: "Market", value: config.marketCode },
 { label: "Currency", value: config.currencyCode },
 { label: "Guard", value: `${config.baseGuardHours}h` }
 ]}
 primaryCtaLabel={products[0] ? "View first product" : undefined}
 onPrimaryPress={
 products[0]
 ? () =>
 router.push({
 pathname: "/(app)/product/[productId]",
 params: { productId: products[0].id }
 })
 : undefined
 }
 secondaryCtaLabel="Open queue"
 onSecondaryPress={() => router.push("/(app)/(tabs)/queue")}
 footer={
 <Text style={styles.heroFooter}>
 No cart in MVP. Quantity is chosen inside product detail, then the order goes straight to checkout.
 </Text>
 }
 />

 {latestPendingSession ? (
 <PendingCheckoutCard
 session={latestPendingSession}
 title="Resume pending payment"
 description="Batch 17 keeps a session-scoped reminder so the user can reopen provider checkout or continue the queue conversion check without guessing IDs again."
 helperText={pendingAssistant.error ?? "This reminder is local to the current mobile app runtime. It does not add any new backend contract."}
 primaryActionLabel={latestPendingSession.queueEntryId ? "Open queue detail" : "Open provider checkout"}
 onPrimaryPress={latestPendingSession.queueEntryId ? pendingAssistant.openQueueDetail : () => void pendingAssistant.openProviderCheckout()}
 secondaryActionLabel={latestPendingSession.queueEntryId ? "Open queue tab" : "Open payment status check"}
 onSecondaryPress={latestPendingSession.queueEntryId ? pendingAssistant.openQueueTab : () => void pendingAssistant.openStatusCheck()}
 tertiaryActionLabel="Dismiss local reminder"
 onTertiaryPress={pendingAssistant.dismiss}
 />
 ) : null}

 <SlotSummaryCard
 nextSlotLabel={nextSlotLabel}
 helper="Fixed settlement slots stay visible. Queue pages keep the current effective rank, not a historical absolute number."
 actionLabel="Open queue"
 onActionPress={() => router.push("/(app)/(tabs)/queue")}
 />

 <LightweightRuleEntryRow
 title="Rule center"
 description="Open queue, wallet, and activity rules without leaving the app."
 onPress={() => router.push("/(app)/rules")}
 />
 </View>
 }
 renderItem={({ item, index }) => (
 <ProductCard
 product={item}
 variant={index === 0 ? "promoted" : "default"}
 onPress={() =>
 router.push({
 pathname: "/(app)/product/[productId]",
 params: { productId: item.id }
 })
 }
 />
 )}
 ItemSeparatorComponent={() => <View style={{ height: mobileTheme.spacing.md }} />}
 ListEmptyComponent={
 homeQuery.isPending ? null : (
 <QueryStateCard
 mode="error"
 title="No products to show"
 description="Readonly data is connected, but there are no queue-eligible products in the current response."
 />
 )
 }
 />

 {homeQuery.isPending ? (
 <View style={styles.overlayCard}>
 <QueryStateCard
 mode="loading"
 title="Preparing home overview"
 description="This build reads readonly data through the repository layer, then applies the visual patch on top."
 />
 </View>
 ) : null}

 {homeQuery.isError ? (
 <View style={styles.overlayCard}>
 <QueryStateCard
 mode="error"
 title="Home overview is unavailable"
 description="Retry the readonly query. The visual layer stays local to the frontend and does not change the contract."
 onRetry={() => {
 void homeQuery.refetch();
 }}
 />
 </View>
 ) : null}
 </SafeAreaView>
 );
}

const styles = StyleSheet.create({
 safeArea: {
 flex: 1,
 backgroundColor: mobileTheme.colors.background
 },
 content: {
 padding: mobileTheme.spacing.md,
 paddingBottom: mobileTheme.spacing.xxl
 },
 headerContent: {
 gap: mobileTheme.spacing.md,
 marginBottom: mobileTheme.spacing.md
 },
 heroFooter: {
 color: mobileTheme.colors.textSecondary,
 fontSize: 13,
 lineHeight: 18
 },
 overlayCard: {
 position: "absolute",
 left: mobileTheme.spacing.md,
 right: mobileTheme.spacing.md,
 top: mobileTheme.spacing.xl
 }
});