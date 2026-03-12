import { router } from "expo-router";
import { Text, View } from "react-native";
import { formatDateTime, formatMinorMoney } from "@queuefree/shared";
import { DemoBanner } from "../../../src/components/demo-banner";
import { KeyValueRow } from "../../../src/components/key-value-row";
import { NavRow } from "../../../src/components/nav-row";
import { PrimaryButton } from "../../../src/components/primary-button";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { StatusPill } from "../../../src/components/status-pill";
import { demoLedgers, demoWallet, demoWithdrawals } from "../../../src/lib/demo-data";
import { getWithdrawalStatusTone } from "../../../src/lib/status-maps";

export default function WalletTabScreen() {
  return (
    <Screen
      title="Wallet"
      subtitle="Cashback enters pending first. Only later, after the release path is satisfied, it may become withdrawable."
    >
      <DemoBanner />

      <SectionCard title="Balances" description="Frontend should never show a negative wallet. Recoverable debt stays internal and only shows a general settlement hint when necessary.">
        <KeyValueRow label="Pending" value={formatMinorMoney(demoWallet.pendingBalanceMinor)} emphasize />
        <KeyValueRow label="Available" value={formatMinorMoney(demoWallet.availableBalanceMinor)} emphasize />
        <KeyValueRow label="Frozen" value={formatMinorMoney(demoWallet.frozenBalanceMinor)} emphasize />
        <Text>Activation path: {demoWallet.activationLabel}</Text>
        {demoWallet.showRecoverableDebtHint ? <Text>There is a settlement exception to resolve.</Text> : null}
        <PrimaryButton label="Go to withdraw" onPress={() => router.push("/(app)/wallet/withdraw")} />
      </SectionCard>

      <SectionCard title="Withdrawal records" description="Submitted withdrawals freeze available balance until approval or rejection.">
        <View style={{ gap: 12 }}>
          {demoWithdrawals.map((item) => (
            <SectionCard
              key={item.id}
              title={item.id}
              description={formatDateTime(item.createdAt)}
              rightSlot={<StatusPill label={item.status} tone={getWithdrawalStatusTone(item.status)} />}
            >
              <Text>Amount: {formatMinorMoney(item.amountMinor)}</Text>
            </SectionCard>
          ))}
        </View>
      </SectionCard>

      <SectionCard title="Ledger preview" description="Real backend must keep wallet ledger append-only.">
        <View style={{ gap: 10 }}>
          {demoLedgers.map((ledger) => (
            <NavRow
              key={ledger.id}
              label={ledger.title}
              description={formatDateTime(ledger.createdAt)}
              rightSlot={<Text>{formatMinorMoney(ledger.amountMinor)}</Text>}
            />
          ))}
        </View>
      </SectionCard>
    </Screen>
  );
}
