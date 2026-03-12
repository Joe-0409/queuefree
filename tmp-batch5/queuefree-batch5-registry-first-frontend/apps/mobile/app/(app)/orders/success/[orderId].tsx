import { router, useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import { Screen } from "../../../../src/components/screen";
import { SectionCard } from "../../../../src/components/section-card";
import { KeyValueRow } from "../../../../src/components/key-value-row";
import { PrimaryButton } from "../../../../src/components/primary-button";
import { formatQueueEntrySummary } from "../../../../src/lib/demo-data";

export default function OrderSuccessScreen() {
  const params = useLocalSearchParams<{ orderId: string }>();
  const orderId = params.orderId || "order-demo";
  const summary = formatQueueEntrySummary("entry-1001");

  return (
    <Screen
      title="Order paid"
      subtitle="Payment success is not the end page. It should turn into the queue conversion page."
    >
      <SectionCard title="Payment result" description="The real backend will create the queue entry after successful payment and basic risk pass.">
        <KeyValueRow label="Order ID" value={orderId} />
        <KeyValueRow label="Queue item" value={summary.title} />
        <KeyValueRow label="Current effective rank" value={summary.rankLabel} />
        <KeyValueRow label="Next settlement slot" value={summary.nextSlotLabel} />
        <KeyValueRow label="Eligible cashback base" value={summary.cashbackLabel} />
      </SectionCard>

      <SectionCard title="Next actions" description="Keep check-in active, watch the next slot, and review queue rules at any time.">
        <Text>• Daily check-in is user-level</Text>
        <Text>• Boost is order-level</Text>
        <Text>• Top30 remains protected</Text>
      </SectionCard>

      <PrimaryButton
        label="Open queue detail"
        onPress={() =>
          router.replace({
            pathname: "/(app)/queue/[entryId]",
            params: { entryId: "entry-1001" }
          })
        }
      />
    </Screen>
  );
}
