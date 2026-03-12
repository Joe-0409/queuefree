import { router, useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import { KeyValueRow } from "../../../../src/components/key-value-row";
import { PrimaryButton } from "../../../../src/components/primary-button";
import { QueryStateCard } from "../../../../src/components/query-state-card";
import { Screen } from "../../../../src/components/screen";
import { SectionCard } from "../../../../src/components/section-card";
import { useOrderSuccessQuery } from "../../../../src/queries/use-mobile-queries";

export default function OrderSuccessScreen() {
  const params = useLocalSearchParams<{ orderId: string | string[] }>();
  const orderId = Array.isArray(params.orderId) ? params.orderId[0] : params.orderId || "order-demo";
  const orderQuery = useOrderSuccessQuery(orderId);

  return (
    <Screen
      title="Order paid"
      subtitle="Payment success is not the end page. It should turn into the queue conversion page."
    >
      {orderQuery.isPending ? (
        <QueryStateCard
          mode="loading"
          title="Preparing queue conversion summary"
          description="Order success now reads its demo summary through the repository-backed query layer."
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

      {orderQuery.data ? (
        <>
          <SectionCard title="Payment result" description="The real backend will create the queue entry after successful payment and basic risk pass.">
            <KeyValueRow label="Order ID" value={orderId} />
            <KeyValueRow label="Queue item" value={orderQuery.data.summary.title} />
            <KeyValueRow label="Current effective rank" value={orderQuery.data.summary.rankLabel} />
            <KeyValueRow label="Next settlement slot" value={orderQuery.data.summary.nextSlotLabel} />
            <KeyValueRow label="Eligible cashback base" value={orderQuery.data.summary.cashbackLabel} />
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
                params: { entryId: orderQuery.data.entryId }
              })
            }
          />
        </>
      ) : null}
    </Screen>
  );
}
