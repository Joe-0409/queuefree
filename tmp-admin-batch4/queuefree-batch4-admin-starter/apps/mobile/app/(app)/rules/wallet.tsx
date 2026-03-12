import { Text, View } from "react-native";
import { formatMinorMoney } from "@queuefree/shared";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { useRuntimeConfig } from "../../../src/hooks/use-runtime-config";

export default function WalletRulesScreen() {
  const { config } = useRuntimeConfig();

  return (
    <Screen
      title="Wallet rules"
      subtitle="Wallet pages must explain pending, available, frozen, release, withdrawal, and general settlement exceptions."
    >
      <SectionCard title="Three visible balance buckets" description="Frontend only shows user-facing buckets and keeps negative display out of the UI.">
        <View style={{ gap: 8 }}>
          <Text>• Pending: newly created cashback that is not withdrawable yet.</Text>
          <Text>• Available: released cashback that can be used for withdrawal requests.</Text>
          <Text>• Frozen: money locked by a withdrawal process or review path.</Text>
        </View>
      </SectionCard>

      <SectionCard title="Release path" description="Winning cashback should not become instantly withdrawable.">
        <Text>• Winner cashback first enters pending balance.</Text>
        <Text>• Release happens only after valid delivery truth and the observation period.</Text>
        <Text>• Default observation fallback is {config.observationHoursAfterDelivery} hours.</Text>
      </SectionCard>

      <SectionCard title="Withdrawal limits" description="These values are runtime-config driven.">
        <Text>• Minimum: {formatMinorMoney(config.withdrawMinAmountMinor)}</Text>
        <Text>• Single max: {formatMinorMoney(config.withdrawSingleMaxMinor)}</Text>
        <Text>• Daily max: {formatMinorMoney(config.withdrawDailyMaxMinor)}</Text>
      </SectionCard>

      <SectionCard title="Settlement exceptions" description="Internal recoverable debt is a backend field and should not leak as a negative wallet figure.">
        <Text>• The app only needs a general hint such as “There is a settlement exception to resolve.”</Text>
        <Text>• Detailed debt math stays on backend and admin views.</Text>
      </SectionCard>
    </Screen>
  );
}
