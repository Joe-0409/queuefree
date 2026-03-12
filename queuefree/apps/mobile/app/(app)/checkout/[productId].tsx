import { useMemo, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import { formatMinorMoney } from "@queuefree/shared";
import { CheckboxRow } from "../../../src/components/checkbox-row";
import { KeyValueRow } from "../../../src/components/key-value-row";
import { PrimaryButton } from "../../../src/components/primary-button";
import { QueryStateCard } from "../../../src/components/query-state-card";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { useProductDetailQuery } from "../../../src/queries/use-mobile-queries";

export default function CheckoutScreen() {
 const params = useLocalSearchParams<{ productId: string | string[]; quantity?: string | string[] }>();
 const productId = Array.isArray(params.productId) ? params.productId[0] : params.productId || "prod-earbuds";
 const requestedQuantity = Array.isArray(params.quantity) ? params.quantity[0] : params.quantity;
 const quantity = useMemo(() => Math.max(1, Number(requestedQuantity || 1)), [requestedQuantity]);
 const productQuery = useProductDetailQuery(productId);
 const [agreed, setAgreed] = useState(false);

 return (
  <Screen
   title="Checkout"
   subtitle="The order snapshot stays product-specific. Quantity changes money, not queue seat count."
  >
   {productQuery.isPending ? (
    <QueryStateCard
     mode="loading"
     title="Preparing checkout snapshot"
     description="Checkout now reads the selected product through the repository-backed query layer."
    />
   ) : null}

   {productQuery.isError ? (
    <QueryStateCard
     mode="error"
     title="Checkout snapshot is unavailable"
     description="Retry the product query."
     onRetry={() => {
      void productQuery.refetch();
     }}
    />
   ) : null}

   {productQuery.data ? (
    <>
     <SectionCard title="Order snapshot" description="One order, one product, many quantity units allowed.">
      <KeyValueRow label="Product" value={productQuery.data.title} />
      <KeyValueRow label="Quantity" value={String(quantity)} />
      <KeyValueRow label="Unit price" value={formatMinorMoney(productQuery.data.priceMinor)} />
      <KeyValueRow label="Estimated item subtotal" value={formatMinorMoney(productQuery.data.priceMinor * quantity)} emphasize />
      <Text>Shipping, tax, packaging, and extra service charges stay outside the eligible cashback base.</Text>
     </SectionCard>

     <SectionCard title="Address and rules" description="The final backend will snapshot address, product, price, and campaign details at order creation time.">
      <Text>Selected shipping address: demo local selection</Text>
      <Text>Queue seat count: 1 order = 1 queue seat</Text>
      <CheckboxRow label="I understand that payment success may create one queue entry for this order." checked={agreed} onPress={() => setAgreed((value) => !value)} />
     </SectionCard>

     <SectionCard title="Payment action" description="The real backend later provides payment intent creation through the generated client.">
      <PrimaryButton
       label="Complete demo payment"
       disabled={!agreed}
       onPress={() =>
        router.replace({
         pathname: "/(app)/orders/success/[orderId]",
         params: { orderId: `order-${productId}` }
        })
       }
      />
     </SectionCard>
    </>
   ) : null}
  </Screen>
 );
}
