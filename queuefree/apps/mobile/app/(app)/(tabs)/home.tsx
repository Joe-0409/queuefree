import { router } from "expo-router";
import { Text, View } from "react-native";
import { formatDateTime, formatMinorMoney } from "@queuefree/shared";
import { DemoBanner } from "../../../src/components/demo-banner";
import { QueryStateCard } from "../../../src/components/query-state-card";
import { NavRow } from "../../../src/components/nav-row";
import { PrimaryButton } from "../../../src/components/primary-button";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { useRuntimeConfig } from "../../../src/hooks/use-runtime-config";
import { useHomeScreenQuery } from "../../../src/queries/use-mobile-queries";

export default function HomeTabScreen() {
  const { config } = useRuntimeConfig();
  const homeQuery = useHomeScreenQuery();

  return (
    <Screen
      title="Home"
      subtitle="Understand the path in seconds: buy a real product, join the queue, then wait for fixed settlement slots."
    >
      <DemoBanner />

      {homeQuery.isPending ? (
        <QueryStateCard
          mode="loading"
          title="Preparing home overview"
          description="This batch reads screen data through a repository layer instead of direct page imports."
        />
      ) : null}

      {homeQuery.isError ? (
        <QueryStateCard
          mode="error"
          title="Home overview is unavailable"
          description="Retry the demo-mode query. The future SDK swap happens inside the repository layer."
          onRetry={() => {
            void homeQuery.refetch();
          }}
        />
      ) : null}

      {homeQuery.data ? (
        <>
          <SectionCard title="Today at a glance" description="MVP launch stays fixed to PH / PHP / Asia/Manila / English.">
            <Text>• Market: {config.marketCode}</Text>
            <Text>• Currency: {config.currencyCode}</Text>
            <Text>• Check-in keeps all active entries valid for {config.baseGuardHours} hours</Text>
            <Text>• Next visible settlement slot: {homeQuery.data.nextSlotAt ? formatDateTime(homeQuery.data.nextSlotAt) : "TBD"}</Text>
          </SectionCard>

          <SectionCard title="Queue-friendly products" description="There is no cart in MVP. Quantity is chosen on the product page, then the order goes straight to checkout.">
            <View style={{ gap: 12 }}>
              {homeQuery.data.products.map((product) => (
                <SectionCard
                  key={product.id}
                  title={product.title}
                  description={`${product.subtitle} · ${product.stockLabel}`}
                >
                  <Text>Price: {formatMinorMoney(product.priceMinor)}</Text>
                  <Text>Default cashback cap: {formatMinorMoney(product.cashbackCapMinor)}</Text>
                  <PrimaryButton
                    label="View product"
                    onPress={() =>
                      router.push({
                        pathname: "/(app)/product/[productId]",
                        params: { productId: product.id }
                      })
                    }
                  />
                </SectionCard>
              ))}
            </View>
          </SectionCard>

          <SectionCard title="Quick access" description="All main legal and rule pages must stay reachable in-app.">
            <View style={{ gap: 10 }}>
              <NavRow
                label="Rules center"
                description="Open queue, wallet, and activity rules"
                onPress={() => router.push("/(app)/rules")}
              />
              <NavRow
                label="Queue tab"
                description="See current effective rank and guard status"
                onPress={() => router.push("/(app)/(tabs)/queue")}
              />
              <NavRow
                label="Support"
                description="Customer service and appeal entry"
                onPress={() => router.push("/(app)/support")}
              />
            </View>
          </SectionCard>
        </>
      ) : null}
    </Screen>
  );
}
