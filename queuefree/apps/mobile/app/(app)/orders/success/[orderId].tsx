import { useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { KeyValueRow } from "../../../../src/components/key-value-row";
import { PendingCheckoutCard } from "../../../../src/components/pending-checkout-card";
import { PrimaryButton } from "../../../../src/components/primary-button";
import { QueryStateCard } from "../../../../src/components/query-state-card";
import { Screen } from "../../../../src/components/screen";
import { SectionCard } from "../../../../src/components/section-card";
import { usePendingCheckoutAssistant, usePendingCheckoutByOrderId } from "../../../../src/hooks/use-pending-checkout";
import { useOrderSuccessQuery } from "../../../../src/queries/use-mobile-queries";
import { usePendingCheckoutStore } from "../../../../src/store/pending-checkout-store";

export default function OrderSuccessScreen() {
 const params = useLocalSearchParams<{ orderId: string | string[] }>();
 const orderId = Array.isArray(params.orderId) ? params.orderId[0] : params.orderId || "order-demo";
 const orderQuery = useOrderSuccessQuery(orderId);
 const session = usePendingCheckoutByOrderId(orderId);
 const assistant = usePendingCheckoutAssistant(session);
 const markQueueEntryVisible = usePendingCheckoutStore((state) => state.markQueueEntryVisible);

 useEffect(() => {
 if (orderQuery.data?.state === "QUEUE_CREATED" && orderQuery.data.entryId) {
 markQueueEntryVisible(orderId, orderQuery.data.entryId);
 }
 }, [markQueueEntryVisible, orderId, orderQuery.data]);

 const displayTitle =
 orderQuery.data?.state === "AWAITING_QUEUE_ENTRY" && session?.productTitle
 ? session.productTitle
 : orderQuery.data?.summary.title;

 return (
 <Screen
 title="Order paid"
 subtitle="Payment success is still not the final business state. Batch 17 now lets the screen stay alive while queue conversion is still pending."
 >
 {orderQuery.isPending ? (
 <QueryStateCard
 mode="loading"
 title="Preparing queue conversion summary"
 description="Order success now checks queue conversion without throwing just because the queue entry is not visible yet."
 />
 ) : null}

 {orderQuery.isError ? (
 <QueryStateCard
 mode="error"
 title="Queue conversion summary is unavailable"
 description="Retry the order-success query."
 onRetry={() => {
 void orderQuery.refetch();
 }}
 />
 ) : null}

 {session ? (
 <PendingCheckoutCard
 session={session}
 title="Current payment reminder"
 description="This local reminder sits beside the generated readonly query so the user can reopen provider checkout or retry queue conversion checks."
 helperText={assistant.error ?? "No new API path is introduced here. The app only combines existing generated SDK calls with local session state."}
 primaryActionLabel={session.queueEntryId ? "Open queue detail" : "Open provider checkout"}
 onPrimaryPress={session.queueEntryId ? assistant.openQueueDetail : () => void assistant.openProviderCheckout()}
 secondaryActionLabel={session.queueEntryId ? "Archive local reminder" : "Refresh queue conversion"}
 onSecondaryPress={session.queueEntryId ? assistant.archive : () => void assistant.refreshQueueState()}
 tertiaryActionLabel="Dismiss local reminder"
 onTertiaryPress={assistant.dismiss}
 />
 ) : null}

 {orderQuery.data ? (
 <>
 <SectionCard title={orderQuery.data.state === "QUEUE_CREATED" ? "Queue conversion result" : "Queue conversion pending"} description={orderQuery.data.helperText}>
 <KeyValueRow label="Order ID" value={orderId} />
 <KeyValueRow label="Queue item" value={displayTitle ?? orderQuery.data.summary.title} />
 <KeyValueRow label="Current effective rank" value={orderQuery.data.summary.rankLabel} />
 <KeyValueRow label="Next settlement slot" value={orderQuery.data.summary.nextSlotLabel} />
 <KeyValueRow label="Eligible cashback base" value={orderQuery.data.summary.cashbackLabel} />
 {orderQuery.data.entryId ? <KeyValueRow label="Queue entry ID" value={orderQuery.data.entryId} /> : null}
 </SectionCard>

 <SectionCard title="Next actions" description="Keep check-in active, watch the next slot, and review queue rules at any time.">
 <Text>• Daily check-in is user-level</Text>
 <Text>• Boost is order-level</Text>
 <Text>• Top30 remains protected</Text>
 {orderQuery.data.state === "AWAITING_QUEUE_ENTRY" ? (
 <Text>• Queue conversion may appear shortly after provider payment confirmation</Text>
 ) : null}
 </SectionCard>

 <View style={{ gap: 12 }}>
 {orderQuery.data.state === "QUEUE_CREATED" && orderQuery.data.entryId ? (
 <PrimaryButton
 label="Open queue detail"
 onPress={() =>
 router.replace({
 pathname: "/(app)/queue/[entryId]",
 params: { entryId: orderQuery.data.entryId! }
 })
 }
 />
 ) : (
 <PrimaryButton
 label="Refresh queue conversion"
 onPress={() => {
 void assistant.refreshQueueState();
 void orderQuery.refetch();
 }}
 />
 )}

 <PrimaryButton label="Open queue tab" variant="secondary" onPress={assistant.openQueueTab} />

 {session?.checkoutUrl ? (
 <PrimaryButton label="Open provider checkout again" variant="secondary" onPress={() => void assistant.openProviderCheckout()} />
 ) : null}
 </View>
 </>
 ) : null}
 </Screen>
 );
}