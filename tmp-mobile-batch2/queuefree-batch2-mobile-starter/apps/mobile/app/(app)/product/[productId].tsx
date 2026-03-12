import { useMemo, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { formatMinorMoney } from "@queuefree/shared";
import { DemoBanner } from "../../../src/components/demo-banner";
import { KeyValueRow } from "../../../src/components/key-value-row";
import { PrimaryButton } from "../../../src/components/primary-button";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { getProductById } from "../../../src/lib/demo-data";
import { useRuntimeConfig } from "../../../src/hooks/use-runtime-config";

export default function ProductDetailScreen() {
  const params = useLocalSearchParams<{ productId: string }>();
  const productId = params.productId || "prod-earbuds";
  const product = useMemo(() => getProductById(productId), [productId]);
  const { config } = useRuntimeConfig();
  const [quantity, setQuantity] = useState(1);

  const totalMinor = product.priceMinor * quantity;

  return (
    <Screen
      title={product.title}
      subtitle="One order contains one product only, but quantity may be greater than one."
    >
      <DemoBanner />

      <SectionCard title="Product summary" description={product.subtitle}>
        <KeyValueRow label="Unit price" value={formatMinorMoney(product.priceMinor)} />
        <KeyValueRow label="Queue cashback cap" value={formatMinorMoney(product.cashbackCapMinor)} />
        <KeyValueRow label="Stock" value={product.stockLabel} />
        <Text>There is no cart. Checkout starts directly from this page in MVP.</Text>
      </SectionCard>

      <SectionCard title="Choose quantity" description={`Default maximum quantity fallback is ${config.defaultOrderMaxQty}.`}>
        <KeyValueRow label="Current quantity" value={String(quantity)} emphasize />
        <KeyValueRow label="Estimated total" value={formatMinorMoney(totalMinor)} emphasize />
        <View style={{ flexDirection: "row", gap: 12 }}>
          <PrimaryButton
            label="−"
            variant="secondary"
            disabled={quantity <= 1}
            onPress={() => setQuantity((current) => Math.max(1, current - 1))}
          />
          <PrimaryButton
            label="+"
            disabled={quantity >= config.defaultOrderMaxQty}
            onPress={() => setQuantity((current) => Math.min(config.defaultOrderMaxQty, current + 1))}
          />
        </View>
      </SectionCard>

      <SectionCard title="What the order means" description="Quantity affects the payment amount, not the number of queue seats.">
        <Text>• One paid order equals one queue seat</Text>
        <Text>• Quantity does not create multiple seats</Text>
        <Text>• Split orders may still be reviewed by risk rules if behavior looks abnormal</Text>
      </SectionCard>

      <PrimaryButton
        label="Go to checkout"
        onPress={() =>
          router.push({
            pathname: "/(app)/checkout/[productId]",
            params: { productId: product.id, quantity: String(quantity) }
          })
        }
      />
    </Screen>
  );
}
