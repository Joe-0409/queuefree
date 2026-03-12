import { router } from "expo-router";
import { Text, View } from "react-native";
import { formatMinorMoney, formatDateTime } from "@queuefree/shared";
import { DemoBanner } from "../../../src/components/demo-banner";
import { NavRow } from "../../../src/components/nav-row";
import { PrimaryButton } from "../../../src/components/primary-button";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { demoProducts, demoQueueEntries } from "../../../src/lib/demo-data";
import { useRuntimeConfig } from "../../../src/hooks/use-runtime-config";

export default function HomeTabScreen() {
  const { config } = useRuntimeConfig();
  const nextSlot = demoQueueEntries[0]?.nextSlotAt;

  return (
    <Screen
      title="Home"
      subtitle="Understand the path in seconds: buy a real product, join the queue, then wait for fixed settlement slots."
    >
      <DemoBanner />

      <SectionCard title="Today at a glance" description="MVP launch stays fixed to PH / PHP / Asia/Manila / English.">
        <Text>• Market: {config.marketCode}</Text>
        <Text>• Currency: {config.currencyCode}</Text>
        <Text>• Check-in keeps all active entries valid for {config.baseGuardHours} hours</Text>
        <Text>• Next visible settlement slot: {nextSlot ? formatDateTime(nextSlot) : "TBD"}</Text>
      </SectionCard>

      <SectionCard title="Queue-friendly products" description="There is no cart in MVP. Quantity is chosen on the product page, then the order goes straight to checkout.">
        <View style={{ gap: 12 }}>
          {demoProducts.map((product) => (
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
    </Screen>
  );
}
