import { useState } from "react";
import { router } from "expo-router";
import { Text, View } from "react-native";
import { formatDateTime, formatMinorMoney } from "@queuefree/shared";
import { DemoBanner } from "../../../src/components/demo-banner";
import { KeyValueRow } from "../../../src/components/key-value-row";
import { PrimaryButton } from "../../../src/components/primary-button";
import { QueryStateCard } from "../../../src/components/query-state-card";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { StatusPill } from "../../../src/components/status-pill";
import { getGuardStatusTone, getQueueStatusTone } from "../../../src/lib/status-maps";
import { useRuntimeConfig } from "../../../src/hooks/use-runtime-config";
import { useQueueScreenQuery } from "../../../src/queries/use-mobile-queries";

export default function QueueTabScreen() {
  const { config } = useRuntimeConfig();
  const queueQuery = useQueueScreenQuery();
  const [checkedInAt, setCheckedInAt] = useState<string | null>(null);

  return (
    <Screen
      title="Queue"
      subtitle="Queue pages show the current effective rank, not a historical absolute rank."
    >
      <DemoBanner />

      {queueQuery.isPending ? (
        <QueryStateCard
          mode="loading"
          title="Preparing queue overview"
          description="Queue guard and queue entries now flow through a screen-level query boundary."
        />
      ) : null}

      {queueQuery.isError ? (
        <QueryStateCard
          mode="error"
          title="Queue overview is unavailable"
          description="Retry the repository-backed demo query."
          onRetry={() => {
            void queueQuery.refetch();
          }}
        />
      ) : null}

      {queueQuery.data ? (
        <>
          <SectionCard
            title="Queue guard"
            description="Check-in is user-level. One successful check-in helps all active queue entries stay valid together."
            rightSlot={<StatusPill label={queueQuery.data.guard.status} tone={getGuardStatusTone(queueQuery.data.guard.status)} />}
          >
            <KeyValueRow label="Valid until" value={formatDateTime(queueQuery.data.guard.validUntil)} />
            <KeyValueRow label="Grace until" value={formatDateTime(queueQuery.data.guard.graceUntil)} />
            <Text>If guard expires, entries become frozen first, then may be removed after the grace window.</Text>
            {checkedInAt ? <Text>Last demo check-in: {formatDateTime(checkedInAt)}</Text> : null}
            <PrimaryButton label="Demo check-in" onPress={() => setCheckedInAt(new Date().toISOString())} />
          </SectionCard>

          <SectionCard title="My queue entries" description={`Top${config.protectZoneSize} is protected. Boost is limited to ${config.boostLimitPerEntry} times per order.`}>
            <View style={{ gap: 12 }}>
              {queueQuery.data.entries.map((entry) => (
                <SectionCard
                  key={entry.id}
                  title={entry.productTitle}
                  description={`Order ${entry.orderId}`}
                  rightSlot={<StatusPill label={entry.status} tone={getQueueStatusTone(entry.status)} />}
                >
                  <KeyValueRow label="Current rank" value={entry.currentRank ? `#${entry.currentRank}` : "Not ranked"} />
                  <KeyValueRow label="Boost used" value={`${entry.boostUsed} / ${config.boostLimitPerEntry}`} />
                  <KeyValueRow label="Next slot" value={formatDateTime(entry.nextSlotAt)} />
                  <KeyValueRow label="Eligible cashback base" value={formatMinorMoney(entry.eligibleCashbackMinor)} />
                  <PrimaryButton
                    label="View queue detail"
                    onPress={() =>
                      router.push({
                        pathname: "/(app)/queue/[entryId]",
                        params: { entryId: entry.id }
                      })
                    }
                  />
                </SectionCard>
              ))}
            </View>
          </SectionCard>
        </>
      ) : null}
    </Screen>
  );
}
