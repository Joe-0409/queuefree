import { useEffect } from "react";
import { router } from "expo-router";
import { Text, View } from "react-native";
import { formatDateTime } from "@queuefree/shared";
import { DemoBanner } from "../../../src/components/demo-banner";
import { PendingCheckoutCard } from "../../../src/components/pending-checkout-card";
import { QueryStateCard } from "../../../src/components/query-state-card";
import { QueueEntryCard } from "../../../src/components/queue-entry-card";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { SlotSummaryCard } from "../../../src/components/slot-summary-card";
import { StatusPill } from "../../../src/components/status-pill";
import { getApiErrorMessage } from "../../../src/lib/api-error";
import { getGuardStatusTone, getQueueStatusTone } from "../../../src/lib/status-maps";
import { useActivePendingCheckoutSessions, usePendingCheckoutAssistant } from "../../../src/hooks/use-pending-checkout";
import { useRuntimeConfig } from "../../../src/hooks/use-runtime-config";
import { useQueueScreenQuery } from "../../../src/queries/use-mobile-queries";
import { useQueueGuardCheckInMutation } from "../../../src/queries/use-mobile-write-mutations";
import { usePendingCheckoutStore } from "../../../src/store/pending-checkout-store";
import type { QueueEntryCardModel } from "../../../src/models/mobile-screen-models";

export default function QueueTabScreen() {
 const { config } = useRuntimeConfig();
 const queueQuery = useQueueScreenQuery();
 const checkInMutation = useQueueGuardCheckInMutation();
 const pendingSessions = useActivePendingCheckoutSessions();
 const latestPendingSession = pendingSessions[0] ?? null;
 const pendingAssistant = usePendingCheckoutAssistant(latestPendingSession);
 const reconcileQueueEntries = usePendingCheckoutStore((state) => state.reconcileQueueEntries);

 const effectiveGuard = queueQuery.data
 ? {
 status: checkInMutation.data?.status ?? queueQuery.data.guard.status,
 validUntil: checkInMutation.data?.validUntil ?? queueQuery.data.guard.validUntil,
 graceUntil: checkInMutation.data?.graceUntil ?? queueQuery.data.guard.graceUntil
 }
 : null;

 useEffect(() => {
 if (!queueQuery.data?.entries?.length) {
 return;
 }

 reconcileQueueEntries(
 queueQuery.data.entries.map((entry) => ({
 orderId: entry.orderId,
 entryId: entry.id
 }))
 );
 }, [queueQuery.data?.entries, reconcileQueueEntries]);


 return (
 <Screen
 title="Queue"
 subtitle="Rank, status, boost availability, next slot, and guard timing stay readable. Batch 17 adds a session-scoped payment continuation loop on top of the existing generated read/write SDK wiring."
 >
 <DemoBanner />

 {latestPendingSession ? (
 <PendingCheckoutCard
 session={latestPendingSession}
 title="Pending payment or queue conversion"
 description="Queue now reconciles local pending sessions against real queue entries. If the order already converted, this reminder turns into a direct queue-detail shortcut."
 helperText={pendingAssistant.error ?? "Use check-in as usual. This card only helps reopen the provider flow or continue the status check."}
 primaryActionLabel={latestPendingSession.queueEntryId ? "Open queue detail" : "Open provider checkout"}
 onPrimaryPress={latestPendingSession.queueEntryId ? pendingAssistant.openQueueDetail : () => void pendingAssistant.openProviderCheckout()}
 secondaryActionLabel={latestPendingSession.queueEntryId ? "Archive local reminder" : "Open payment status check"}
 onSecondaryPress={latestPendingSession.queueEntryId ? pendingAssistant.archive : () => void pendingAssistant.openStatusCheck()}
 tertiaryActionLabel={latestPendingSession.queueEntryId ? undefined : "Refresh queue now"}
 onTertiaryPress={latestPendingSession.queueEntryId ? undefined : () => void pendingAssistant.refreshQueueState()}
 />
 ) : null}

 {queueQuery.isPending ? (
 <QueryStateCard
 mode="loading"
 title="Preparing queue overview"
 description="Queue guard and queue entries flow through the readonly screen-level query boundary."
 />
 ) : null}

 {queueQuery.isError ? (
 <QueryStateCard
 mode="error"
 title="Queue overview is unavailable"
 description="Retry the repository-backed queue query."
 onRetry={() => {
 void queueQuery.refetch();
 }}
 />
 ) : null}

 {queueQuery.data && effectiveGuard ? (
 <>
 <SlotSummaryCard
 nextSlotLabel={formatDateTime(effectiveGuard.validUntil)}
 helper={`Check-in is user-level. Top${config.protectZoneSize} stays protected and boost remains limited to ${config.boostLimitPerEntry} times per order.`}
 actionLabel="Check in now"
 actionLoading={checkInMutation.isPending}
 onActionPress={() => checkInMutation.mutate()}
 />

 <View style={{ gap: 8 }}>
 <StatusPill label={effectiveGuard.status} tone={getGuardStatusTone(effectiveGuard.status)} />
 <Text>If guard expires, entries freeze first and may later be removed after the grace window.</Text>
 {checkInMutation.data?.lastCheckinAt ? <Text>Last generated check-in: {formatDateTime(checkInMutation.data.lastCheckinAt)}</Text> : null}
 </View>

 {checkInMutation.isError ? (
 <SectionCard
 title="Check-in failed"
 description="The generated SDK returned an error while trying to refresh the user-level queue guard."
 variant="muted"
 >
 <Text>{getApiErrorMessage(checkInMutation.error, "Unable to complete queue guard check-in.")}</Text>
 </SectionCard>
 ) : null}

 {checkInMutation.isSuccess ? (
 <SectionCard
 title="Check-in accepted"
 description="The queue guard now reflects the server response returned by checkInQueueGuard."
 >
 <Text>Status: {checkInMutation.data.status}</Text>
 {checkInMutation.data.lastCheckinAt ? <Text>Checked in at: {formatDateTime(checkInMutation.data.lastCheckinAt)}</Text> : null}
 <Text>Valid until: {formatDateTime(checkInMutation.data.validUntil)}</Text>
 </SectionCard>
 ) : null}

 <View style={{ gap: 12 }}>
 {queueQuery.data.entries.map((entry: QueueEntryCardModel) => (
 <QueueEntryCard
 key={entry.id}
 entry={entry}
 variant="compact"
 statusTone={getQueueStatusTone(entry.status)}
 nextSlotLabel={formatDateTime(entry.nextSlotAt)}
 onPress={() =>
 router.push({
 pathname: "/(app)/queue/[entryId]",
 params: { entryId: entry.id }
 })
 }
 />
 ))}
 </View>
 </>
 ) : null}
 </Screen>
 );
}