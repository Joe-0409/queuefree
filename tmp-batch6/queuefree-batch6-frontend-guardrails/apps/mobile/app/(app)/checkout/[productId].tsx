import { useMemo, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { formatMinorMoney } from "@queuefree/shared";
import { CheckboxRow } from "../../../src/components/checkbox-row";
import { DemoBanner } from "../../../src/components/demo-banner";
import { KeyValueRow } from "../../../src/components/key-value-row";
import { PrimaryButton } from "../../../src/components/primary-button";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { getProductById } from "../../../src/lib/demo-data";

export default function CheckoutScreen() {
  const params = useLocalSearchParams<{ productId: string; quantity?: string }>();
  const productId = params.productId || "prod-earbuds";
  const quantity = Number(params.quantity ?? 1);
  const product = useMemo(() => getProductById(productId), [productId]);
  const [agreeToRules, setAgreeToRules] = useState(false);

  const totalMinor = product.priceMinor * quantity;
  const orderId = `order-${product.id}-demo`;

  return (
    <Screen
      title="Checkout"
      subtitle="The order snapshot should be fixed at checkout. Payment success later becomes the queue conversion page."
    >
      <DemoBanner />

      <SectionCard title="Shipping address" description="The real backend later uses the user's saved address list.">
        <Text>Demo address: 21 Ayala Avenue, Makati City, Metro Manila</Text>
      </SectionCard>

      <SectionCard title="Order snapshot" description="One order, one product, multiple quantity allowed.">
        <KeyValueRow label="Product" value={product.title} />
        <KeyValueRow label="Unit price" value={formatMinorMoney(product.priceMinor)} />
        <KeyValueRow label="Quantity" value={String(quantity)} />
        <KeyValueRow label="Payable total" value={formatMinorMoney(totalMinor)} emphasize />
      </SectionCard>

      <SectionCard title="Payment and rules" description="Do not use IAP / Play Billing for physical goods. Real payment providers must go through backend adapters.">
        <CheckboxRow
          checked={agreeToRules}
          onPress={() => setAgreeToRules((current) => !current)}
          label="I understand the queue rules, payment rules, and refund impact."
          hint="The real frontend later uses generated order creation and payment-intent calls after backend exports OpenAPI."
        />
      </SectionCard>

      <View style={{ gap: 12 }}>
        <PrimaryButton
          label="Pay and create demo order"
          disabled={!agreeToRules}
          onPress={() =>
            router.replace({
              pathname: "/(app)/orders/success/[orderId]",
              params: { orderId }
            })
          }
        />
        {!agreeToRules ? <Text>Please confirm the rules before continuing.</Text> : null}
      </View>
    </Screen>
  );
}
