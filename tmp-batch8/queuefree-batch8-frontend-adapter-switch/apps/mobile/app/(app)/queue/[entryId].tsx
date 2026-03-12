import { router, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { formatDateTime, formatMinorMoney } from "@queuefree/shared";
import { DemoBanner } from "../../../src/components/demo-banner";
import { KeyValueRow } from "../../../src/components/key-value-row";
import { NavRow } from "../../../src/components/nav-row";
import { PrimaryButton } from "../../../src/components/primary-button";
import { QueryStateCard } from "../../../src/components/query-state-card";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { StatusPill } from "../../../src/components/status-pill";
import { getQueueStatusTone } from "../../../src/lib/status-maps";
import { useRuntimeConfig } from "../../../src/hooks/use-runtime-config";
import { useQueueEntryDetailQuery } from "../../../src/queries/use-mobile-queries";

export default function QueueDetailScreen() {
  const params = useLocalSearchParams<{ entryId: string | string[] }>();
  const entryId = Array.isArray(params.entryId) ? params.entryId[0] : params.entryId || "entry-1001";
  const entryQuery = useQueueEntryDetailQuery(entryId);
  const { config } = useRuntimeConfig();

  return (
    <Screen
      title="Queue detail"
      subtitle="This page explains rank, next slot, and queue events in a way the user can follow."
    >
      <DemoBanner />

      {entryQuery.isPending ? (
        <QueryStateCard
          mode="loading"
          title="Preparing queue detail"
          description="Queue detail now reads through the repository-backed query boundary."
        />
      ) : null}

      {entryQuery.isError ? (
        <QueryStateCard
          mode="error"
          title="Queue detail is unavailable"
          description="Retry the queue-detail query."
          onRetry={() => {
            void entryQuery.refetch();
          }}
        />
      ) : null}

      {entryQuery.data ? (
        <>
          <SectionCard
            title={entryQuery.data.productTitle}
            description={`Order ${entryQuery.data.orderId}`}
            rightSlot={<StatusPill label={entryQuery.data.status} tone={getQueueStatusTone(entryQuery.data.status)} />}
          >
            <KeyValueRow label="Current effective rank" value={entryQuery.data.currentRank ? `#${entryQuery.data.currentRank}` : "Frozen or removed"} />
            <KeyValueRow label="Boost used" value={`${entryQuery.data.boostUsed} / ${config.boostLimitPerEntry}`} />
            <KeyValueRow label="Next settlement slot" value={formatDateTime(entryQuery.data.nextSlotAt)} />
            <KeyValueRow label="Eligible cashback base" value={formatMinorMoney(entryQuery.data.eligibleCashbackMinor)} emphasize />
          </SectionCard>

          <SectionCard title="What changed" description="All rank changes should map to explainable queue events later.">
            <View style={{ gap: 10 }}>
              <NavRow label="Paid order entered the public queue" description="Event source: payment success + risk pass" />
              <NavRow label="Active rank recalculated" description="Derived from active entries only" />
              <NavRow label="Top30 protection respected" description={`Best boost result cannot cross rank ${config.protectZoneSize + 1}`} />
            </View>
          </SectionCard>

          <PrimaryButton label="Back to queue tab" onPress={() => router.back()} />
        </>
      ) : null}
    </Screen>
  );
}
