import { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { formatMinorMoney } from "@queuefree/shared";
import { DemoBanner } from "../../../src/components/demo-banner";
import { KeyValueRow } from "../../../src/components/key-value-row";
import { PrimaryButton } from "../../../src/components/primary-button";
import { QueryStateCard } from "../../../src/components/query-state-card";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { useRuntimeConfig } from "../../../src/hooks/use-runtime-config";
import { useProductDetailQuery } from "../../../src/queries/use-mobile-queries";

export default function ProductDetailScreen() {
  const params = useLocalSearchParams<{ productId: string | string[] }>();
  const productId = Array.isArray(params.productId) ? params.productId[0] : params.productId || "prod-earbuds";
  const productQuery = useProductDetailQuery(productId);
  const { config } = useRuntimeConfig();
  const [quantity, setQuantity] = useState(1);

  const totalMinor = (productQuery.data?.priceMinor ?? 0) * quantity;

  return (
    <Screen
      title={productQuery.data?.title ?? "Product"}
      subtitle="One order contains one product only, but quantity may be greater than one."
    >
      <DemoBanner />

      {productQuery.isPending ? (
        <QueryStateCard
          mode="loading"
          title="Preparing product detail"
          description="Product detail now reads through a repository-backed query."
        />
      ) : null}

      {productQuery.isError ? (
        <QueryStateCard
          mode="error"
          title="Product detail is unavailable"
          description="Retry the product detail query."
          onRetry={() => {
            void productQuery.refetch();
          }}
        />
      ) : null}

      {productQuery.data ? (
        <>
          <SectionCard title="Product summary" description={productQuery.data.subtitle}>
            <KeyValueRow label="Unit price" value={formatMinorMoney(productQuery.data.priceMinor)} />
            <KeyValueRow label="Queue cashback cap" value={formatMinorMoney(productQuery.data.cashbackCapMinor)} />
            <KeyValueRow label="Stock hint" value={productQuery.data.stockLabel} />
            <Text>The frontend may show summary hints, but queue eligibility and price truth stay on backend snapshots.</Text>
          </SectionCard>

          <SectionCard title="Choose quantity" description={`Default max quantity fallback: ${config.defaultOrderMaxQty}`}>
            <View style={{ gap: 10 }}>
              <KeyValueRow label="Quantity" value={String(quantity)} />
              <KeyValueRow label="Estimated subtotal" value={formatMinorMoney(totalMinor)} />
              <View style={{ flexDirection: "row", gap: 10 }}>
                <PrimaryButton label="-1" disabled={quantity <= 1} onPress={() => setQuantity((value) => Math.max(1, value - 1))} />
                <PrimaryButton label="+1" disabled={quantity >= config.defaultOrderMaxQty} onPress={() => setQuantity((value) => Math.min(config.defaultOrderMaxQty, value + 1))} />
              </View>
            </View>
          </SectionCard>

          <SectionCard title="Checkout path" description="There is no cart in MVP. The route goes straight from product detail to checkout.">
            <PrimaryButton
              label="Continue to checkout"
              onPress={() =>
                router.push({
                  pathname: "/(app)/checkout/[productId]",
                  params: { productId, quantity: String(quantity) }
                })
              }
            />
          </SectionCard>
        </>
      ) : null}
    </Screen>
  );
}
