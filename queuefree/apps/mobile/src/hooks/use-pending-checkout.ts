import { useMemo, useState } from "react";
import { Linking } from "react-native";
import { router } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";
import { getApiErrorMessage } from "../lib/api-error";
import {
 type PendingCheckoutSession,
 usePendingCheckoutStore
} from "../store/pending-checkout-store";

function byNewest(left: PendingCheckoutSession, right: PendingCheckoutSession) {
 return new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime();
}

export function useCheckoutDraft(productId: string) {
 return usePendingCheckoutStore((state) => state.draftsByProductId[productId] ?? null);
}

export function useActivePendingCheckoutSessions(productId?: string) {
 const sessions = usePendingCheckoutStore((state) => state.sessions);

 return useMemo(() => {
 return sessions
 .filter((session) => session.lifecycle !== "ARCHIVED")
 .filter((session) => (productId ? session.productId === productId : true))
 .sort(byNewest);
 }, [productId, sessions]);
}

export function usePendingCheckoutByOrderId(orderId: string) {
 const sessions = usePendingCheckoutStore((state) => state.sessions);

 return useMemo(() => sessions.find((session) => session.orderId === orderId) ?? null, [orderId, sessions]);
}

export function usePendingCheckoutAssistant(session: PendingCheckoutSession | null) {
 const queryClient = useQueryClient();
 const markProviderOpened = usePendingCheckoutStore((state) => state.markProviderOpened);
 const markAwaitingQueueEntry = usePendingCheckoutStore((state) => state.markAwaitingQueueEntry);
 const archiveSession = usePendingCheckoutStore((state) => state.archiveSession);
 const removeSession = usePendingCheckoutStore((state) => state.removeSession);

 const [error, setError] = useState<string | null>(null);

 async function openProviderCheckout() {
 if (!session) {
 return;
 }

 setError(null);
 markProviderOpened(session.orderId);

 try {
 await Linking.openURL(session.checkoutUrl);
 } catch (value) {
 setError(getApiErrorMessage(value, "Unable to reopen the provider checkout URL."));
 }
 }

 async function refreshQueueState() {
 if (!session) {
 return;
 }

 markAwaitingQueueEntry(session.orderId);
 setError(null);

 await Promise.all([
 queryClient.invalidateQueries({ queryKey: ["mobile", "queue-screen"] }),
 queryClient.invalidateQueries({ queryKey: ["mobile", "order-success", session.orderId] }),
 queryClient.invalidateQueries({ queryKey: ["mobile", "queue-entry-detail"] })
 ]);
 }

 async function openStatusCheck() {
 if (!session) {
 return;
 }

 await refreshQueueState();
 router.push({
 pathname: "/(app)/orders/success/[orderId]",
 params: { orderId: session.orderId }
 });
 }

 function openQueueDetail() {
 if (!session?.queueEntryId) {
 return;
 }

 router.push({
 pathname: "/(app)/queue/[entryId]",
 params: { entryId: session.queueEntryId }
 });
 }

 function openQueueTab() {
 router.push("/(app)/(tabs)/queue");
 }

 function archive() {
 if (!session) {
 return;
 }

 archiveSession(session.orderId);
 }

 function dismiss() {
 if (!session) {
 return;
 }

 removeSession(session.orderId);
 }

 return {
 error,
 session,
 clearError: () => setError(null),
 openProviderCheckout,
 refreshQueueState,
 openStatusCheck,
 openQueueDetail,
 openQueueTab,
 archive,
 dismiss
 };
}