import { useMemo, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { formatDateTime, formatMinorMoney } from "@queuefree/shared";
import { DemoBanner } from "../../../src/components/demo-banner";
import { KeyValueRow } from "../../../src/components/key-value-row";
import { PrimaryButton } from "../../../src/components/primary-button";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { StatusPill } from "../../../src/components/status-pill";
import { getQueueEntryById } from "../../../src/lib/demo-data";
import { getQueueStatusTone } from "../../../src/lib/status-maps";
import { useRuntimeConfig } from "../../../src/hooks/use-runtime-config";

export default function QueueDetailScreen() {
  const params = useLocalSearchParams<{ entryId: string }>();
  const entryId = params.entryId || "entry-1001";
  const entry = useMemo(() => getQueueEntryById(entryId), [entryId]);
  const { config } = useRuntimeConfig();
  const [boostUsedDemo, setBoostUsedDemo] = useState(entry.boostUsed);

  const isProtectedZone = typeof entry.currentRank === "number" && entry.currentRank <= config.protectZoneSize;
  const boostRemaining = Math.max(config.boostLimitPerEntry - boostUsedDemo, 0);
  const canBoost = entry.status === "ACTIVE" && boostRemaining > 0 && !isProtectedZone;

  const eventLog = [
    "Order paid and queue entry created",
    "Current effective rank recalculated",
    "User queue guard valid",
    boostUsedDemo > 0 ? `Boost used ${boostUsedDemo} time(s)` : "No boost used yet"
  ];

  return (
    <Screen
      title="Queue detail"
      subtitle="This page should explain exactly why the entry is active, frozen, winning, or removed."
    >
      <DemoBanner />

      <SectionCard
        title={entry.productTitle}
        description={`Order ${entry.orderId}`}
        rightSlot={<StatusPill label={entry.status} tone={getQueueStatusTone(entry.status)} />}
      >
        <KeyValueRow label="Current rank" value={entry.currentRank ? `#${entry.currentRank}` : "Not ranked"} />
        <KeyValueRow label="Next slot" value={formatDateTime(entry.nextSlotAt)} />
        <KeyValueRow label="Eligible cashback base" value={formatMinorMoney(entry.eligibleCashbackMinor)} />
        <KeyValueRow label="Boost remaining" value={String(boostRemaining)} emphasize />
      </SectionCard>

      <SectionCard title="Boost" description="Boost is order-level, limited per entry, and cannot cross the Top30 protection zone.">
        <Text>{isProtectedZone ? `This entry is already in Top${config.protectZoneSize}, so boost is disabled.` : "Boost can still be used if the backend confirms availability."}</Text>
        <PrimaryButton
          label={canBoost ? "Use demo boost" : "Boost unavailable"}
          disabled={!canBoost}
          onPress={() => setBoostUsedDemo((current) => current + 1)}
        />
      </SectionCard>

      <SectionCard title="Event log" description="Queue event trails should remain traceable for users and admins.">
        <View style={{ gap: 8 }}>
          {eventLog.map((eventItem) => (
            <Text key={eventItem}>• {eventItem}</Text>
          ))}
        </View>
      </SectionCard>
    </Screen>
  );
}
