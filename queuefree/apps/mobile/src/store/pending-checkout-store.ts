import { create } from "zustand";

export type PendingCheckoutLifecycle =
 | "PENDING_PAYMENT"
 | "PROVIDER_OPENED"
 | "AWAITING_QUEUE_ENTRY"
 | "QUEUE_ENTRY_VISIBLE"
 | "ARCHIVED";

export type CheckoutDraft = {
 productId: string;
 skuId: string;
 addressId: string;
 quantity: number;
 updatedAt: string;
};

export type PendingCheckoutSession = {
 sessionId: string;
 orderId: string;
 paymentIntentId: string;
 productId: string;
 productTitle: string;
 skuId: string;
 addressId: string;
 quantity: number;
 provider: string;
 amountMinor: number;
 currencyCode: string;
 checkoutUrl: string;
 createdAt: string;
 lastOpenedAt: string | null;
 lastCheckedAt: string | null;
 lifecycle: PendingCheckoutLifecycle;
 queueEntryId: string | null;
};

type PendingCheckoutStore = {
 draftsByProductId: Record<string, CheckoutDraft>;
 sessions: PendingCheckoutSession[];
 saveDraft(input: { productId: string; skuId: string; addressId: string; quantity: number }): void;
 clearDraft(productId: string): void;
 upsertSession(session: PendingCheckoutSession): void;
 markProviderOpened(orderId: string): void;
 markAwaitingQueueEntry(orderId: string): void;
 markQueueEntryVisible(orderId: string, entryId: string): void;
 archiveSession(orderId: string): void;
 removeSession(orderId: string): void;
 reconcileQueueEntries(entries: Array<{ orderId: string; entryId: string }>): void;
};

function sortSessions(sessions: PendingCheckoutSession[]) {
 return [...sessions].sort((left, right) => {
 const leftTime = new Date(left.createdAt).getTime();
 const rightTime = new Date(right.createdAt).getTime();
 return rightTime - leftTime;
 });
}

function updateSession(
 sessions: PendingCheckoutSession[],
 orderId: string,
 updater: (session: PendingCheckoutSession) => PendingCheckoutSession
) {
 return sortSessions(
 sessions.map((session) => (session.orderId === orderId ? updater(session) : session))
 );
}

export const usePendingCheckoutStore = create<PendingCheckoutStore>((set) => ({
 draftsByProductId: {},
 sessions: [],
 saveDraft: ({ productId, skuId, addressId, quantity }) =>
 set((state) => ({
 draftsByProductId: {
 ...state.draftsByProductId,
 [productId]: {
 productId,
 skuId,
 addressId,
 quantity,
 updatedAt: new Date().toISOString()
 }
 }
 })),
 clearDraft: (productId) =>
 set((state) => {
 const nextDrafts = { ...state.draftsByProductId };
 delete nextDrafts[productId];
 return { draftsByProductId: nextDrafts };
 }),
 upsertSession: (session) =>
 set((state) => {
 const existing = state.sessions.find((item) => item.orderId === session.orderId);
 const nextSessions = existing
 ? state.sessions.map((item) => (item.orderId === session.orderId ? { ...item, ...session } : item))
 : [session, ...state.sessions];

 return { sessions: sortSessions(nextSessions) };
 }),
 markProviderOpened: (orderId) =>
 set((state) => ({
 sessions: updateSession(state.sessions, orderId, (session) => ({
 ...session,
 lifecycle: session.lifecycle === "QUEUE_ENTRY_VISIBLE" ? session.lifecycle : "PROVIDER_OPENED",
 lastOpenedAt: new Date().toISOString()
 }))
 })),
 markAwaitingQueueEntry: (orderId) =>
 set((state) => ({
 sessions: updateSession(state.sessions, orderId, (session) => ({
 ...session,
 lifecycle: session.lifecycle === "QUEUE_ENTRY_VISIBLE" ? session.lifecycle : "AWAITING_QUEUE_ENTRY",
 lastCheckedAt: new Date().toISOString()
 }))
 })),
 markQueueEntryVisible: (orderId, entryId) =>
 set((state) => ({
 sessions: updateSession(state.sessions, orderId, (session) => ({
 ...session,
 lifecycle: "QUEUE_ENTRY_VISIBLE",
 queueEntryId: entryId,
 lastCheckedAt: new Date().toISOString()
 }))
 })),
 archiveSession: (orderId) =>
 set((state) => ({
 sessions: updateSession(state.sessions, orderId, (session) => ({
 ...session,
 lifecycle: "ARCHIVED"
 }))
 })),
 removeSession: (orderId) =>
 set((state) => ({
 sessions: state.sessions.filter((session) => session.orderId !== orderId)
 })),
 reconcileQueueEntries: (entries) =>
 set((state) => ({
 sessions: sortSessions(
 state.sessions.map((session) => {
 const match = entries.find((entry) => entry.orderId === session.orderId);
 if (!match) {
 return session;
 }

 return {
 ...session,
 lifecycle: "QUEUE_ENTRY_VISIBLE",
 queueEntryId: match.entryId,
 lastCheckedAt: new Date().toISOString()
 };
 })
 )
 }))
}));