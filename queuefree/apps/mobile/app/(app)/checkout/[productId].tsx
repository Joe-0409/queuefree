import { useEffect, useMemo, useState } from "react";
import { Linking, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { formatMinorMoney } from "@queuefree/shared";
import { CheckboxRow } from "../../../src/components/checkbox-row";
import { KeyValueRow } from "../../../src/components/key-value-row";
import { PendingCheckoutCard } from "../../../src/components/pending-checkout-card";
import { PrimaryButton } from "../../../src/components/primary-button";
import { QueryStateCard } from "../../../src/components/query-state-card";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { TextField } from "../../../src/components/text-field";
import { getApiErrorMessage } from "../../../src/lib/api-error";
import { buildPendingCheckoutSession } from "../../../src/lib/pending-checkout-session";
import { useCheckoutDraft, usePendingCheckoutAssistant, useActivePendingCheckoutSessions } from "../../../src/hooks/use-pending-checkout";
import { useProductDetailQuery } from "../../../src/queries/use-mobile-queries";
import { useCreateCheckoutSessionMutation } from "../../../src/queries/use-mobile-write-mutations";
import { usePendingCheckoutStore } from "../../../src/store/pending-checkout-store";

export default function CheckoutScreen() {
 const params = useLocalSearchParams<{ productId: string | string[]; quantity?: string | string[] }>();
 const productId = Array.isArray(params.productId) ? params.productId[0] : params.productId || "prod-earbuds";
 const requestedQuantity = Array.isArray(params.quantity) ? params.quantity[0] : params.quantity;
 const quantity = useMemo(() => Math.max(1, Number(requestedQuantity || 1)), [requestedQuantity]);
 const productQuery = useProductDetailQuery(productId);
 const checkoutMutation = useCreateCheckoutSessionMutation();
 const checkoutDraft = useCheckoutDraft(productId);
 const pendingSessions = useActivePendingCheckoutSessions(productId);
 const latestPendingSession = pendingSessions[0] ?? null;
 const pendingAssistant = usePendingCheckoutAssistant(latestPendingSession);
 const saveDraft = usePendingCheckoutStore((state) => state.saveDraft);
 const clearDraft = usePendingCheckoutStore((state) => state.clearDraft);
 const upsertSession = usePendingCheckoutStore((state) => state.upsertSession);

 const [agreed, setAgreed] = useState(false);
 const [attemptedSubmit, setAttemptedSubmit] = useState(false);
 const [skuId, setSkuId] = useState("");
 const [addressId, setAddressId] = useState("");
 const [launchError, setLaunchError] = useState<string | null>(null);

 useEffect(() => {
 if (!checkoutDraft) {
 return;
 }

 setSkuId((current) => current || checkoutDraft.skuId);
 setAddressId((current) => current || checkoutDraft.addressId);
 }, [checkoutDraft]);

 useEffect(() => {
 saveDraft({
 productId,
 skuId,
 addressId,
 quantity
 });
 }, [addressId, productId, quantity, saveDraft, skuId]);

 useEffect(() => {
 if (!checkoutMutation.data || !productQuery.data) {
 return;
 }

 upsertSession(
 buildPendingCheckoutSession({
 checkout: checkoutMutation.data,
 productTitle: productQuery.data.title,
 addressId: addressId.trim()
 })
 );
 }, [addressId, checkoutMutation.data, productQuery.data, upsertSession]);

 const skuError = attemptedSubmit && !skuId.trim() ? "SKU ID is required for the generated write contract." : undefined;
 const addressError = attemptedSubmit && !addressId.trim() ? "Address ID is required for the generated write contract." : undefined;

 const canSubmit = agreed && Boolean(skuId.trim()) && Boolean(addressId.trim()) && !checkoutMutation.isPending;

 async function openProviderCheckout() {
 if (!checkoutMutation.data) {
 return;
 }

 setLaunchError(null);

 try {
 await Linking.openURL(checkoutMutation.data.checkoutUrl);
 } catch (error) {
 setLaunchError(getApiErrorMessage(error, "Unable to open the provider checkout URL."));
 }
 }

 function submitCheckout() {
 setAttemptedSubmit(true);
 setLaunchError(null);

 if (!skuId.trim() || !addressId.trim()) {
 return;
 }

 checkoutMutation.mutate({
 productId,
 skuId: skuId.trim(),
 quantity,
 addressId: addressId.trim()
 });
 }

 return (
 <Screen
 title="Checkout"
 subtitle="Batch 17 keeps a session-scoped checkout reminder, so the user can continue provider payment or reopen queue conversion checks without guessing order IDs again."
 >
 {latestPendingSession ? (
 <PendingCheckoutCard
 session={latestPendingSession}
 title="Current pending checkout"
 description="This card stays inside the current mobile app runtime. It does not invent any new backend contract while address-book and SKU readonly APIs are still missing."
 helperText={pendingAssistant.error ?? "The stored draft is session-scoped. Reopening provider checkout or payment-status checks stays available while the app process is alive."}
 primaryActionLabel={latestPendingSession.queueEntryId ? "Open queue detail" : "Open provider checkout"}
 onPrimaryPress={latestPendingSession.queueEntryId ? pendingAssistant.openQueueDetail : () => void pendingAssistant.openProviderCheckout()}
 secondaryActionLabel={latestPendingSession.queueEntryId ? "Archive local reminder" : "Open payment status check"}
 onSecondaryPress={latestPendingSession.queueEntryId ? pendingAssistant.archive : () => void pendingAssistant.openStatusCheck()}
 tertiaryActionLabel="Clear saved draft"
 onTertiaryPress={() => {
 clearDraft(productId);
 setSkuId("");
 setAddressId("");
 }}
 />
 ) : null}

 {productQuery.isPending ? (
 <QueryStateCard
 mode="loading"
 title="Preparing checkout snapshot"
 description="Checkout now reads the selected product through the repository-backed query layer."
 />
 ) : null}

 {productQuery.isError ? (
 <QueryStateCard
 mode="error"
 title="Checkout snapshot is unavailable"
 description="Retry the product query."
 onRetry={() => {
 void productQuery.refetch();
 }}
 />
 ) : null}

 {productQuery.data ? (
 <>
 <SectionCard title="Order snapshot" description="One order, one product, many quantity units allowed.">
 <KeyValueRow label="Product" value={productQuery.data.title} />
 <KeyValueRow label="Quantity" value={String(quantity)} />
 <KeyValueRow label="Unit price" value={formatMinorMoney(productQuery.data.priceMinor)} />
 <KeyValueRow label="Estimated item subtotal" value={formatMinorMoney(productQuery.data.priceMinor * quantity)} emphasize />
 <Text>Shipping, tax, packaging, and extra service charges stay outside the eligible cashback base.</Text>
 </SectionCard>

 <SectionCard
 title="Write contract inputs"
 description="The generated createOrder request still requires productId, skuId, quantity, and addressId. Batch 17 remembers the last values for this product inside the current app runtime, but it does not fake readonly SKU or address sources."
 >
 <TextField
 label="SKU ID"
 value={skuId}
 onChangeText={(value) => {
 setSkuId(value);
 if (checkoutMutation.isError || checkoutMutation.isSuccess) {
 checkoutMutation.reset();
 }
 }}
 placeholder="Paste the backend-issued SKU ID"
 errorText={skuError}
 />
 <TextField
 label="Address ID"
 value={addressId}
 onChangeText={(value) => {
 setAddressId(value);
 if (checkoutMutation.isError || checkoutMutation.isSuccess) {
 checkoutMutation.reset();
 }
 }}
 placeholder="Paste the backend-issued address ID"
 errorText={addressError}
 />
 <Text>These values are still real backend IDs. The frontend only remembers them locally for the same runtime session.</Text>
 </SectionCard>

 <SectionCard title="Rules acknowledgment" description="The final backend snapshots address, product, price, and campaign details at order creation time.">
 <Text>Queue seat count: 1 order = 1 queue seat</Text>
 <Text>Order creation and payment intent creation are wired through the generated write bridge. Batch 17 only adds a session-scoped continuation helper.</Text>
 <CheckboxRow
 label="I understand that payment success may later create one queue entry for this order."
 checked={agreed}
 onPress={() => setAgreed((value) => !value)}
 />
 </SectionCard>

 <SectionCard title="Payment action" description="This button calls createOrder first, then createPaymentIntent with the returned orderId.">
 <PrimaryButton
 label="Create order and payment intent"
 loading={checkoutMutation.isPending}
 disabled={!canSubmit}
 onPress={submitCheckout}
 />
 </SectionCard>

 {checkoutMutation.isError ? (
 <SectionCard title="Checkout session failed" description="The generated SDK returned an error while creating the order or payment intent." variant="muted">
 <Text>{getApiErrorMessage(checkoutMutation.error, "Unable to create the checkout session.")}</Text>
 </SectionCard>
 ) : null}

 {checkoutMutation.data ? (
 <SectionCard title="Payment intent created" description="The order and payment intent now come from generated write operations.">
 <KeyValueRow label="Order ID" value={checkoutMutation.data.orderId} />
 <KeyValueRow label="Order status" value={checkoutMutation.data.orderStatus} />
 <KeyValueRow label="Payment intent ID" value={checkoutMutation.data.paymentIntentId} />
 <KeyValueRow label="Provider" value={checkoutMutation.data.provider} />
 <KeyValueRow label="Provider amount" value={formatMinorMoney(checkoutMutation.data.amountMinor)} />
 <Text>After provider payment, the queue conversion may lag behind slightly. Batch 17 adds a local reminder so the user can reopen checkout or retry the order-success check without retyping IDs.</Text>

 <View style={{ gap: 12 }}>
 <PrimaryButton label="Open provider checkout" variant="promo" onPress={() => void openProviderCheckout()} />
 <PrimaryButton label="Open payment status check" variant="secondary" onPress={() => void pendingAssistant.openStatusCheck()} />
 </View>

 {launchError ? <Text>{launchError}</Text> : null}
 </SectionCard>
 ) : null}
 </>
 ) : null}
 </Screen>
 );
}