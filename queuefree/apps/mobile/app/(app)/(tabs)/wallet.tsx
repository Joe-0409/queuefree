import { router } from "expo-router";
import { Text, View } from "react-native";
import { formatDateTime, formatMinorMoney } from "@queuefree/shared";
import type { WalletLedgerModel, WithdrawalRecordModel } from "../../../src/models/mobile-screen-models";
import { DemoBanner } from "../../../src/components/demo-banner";
import { PendingCheckoutCard } from "../../../src/components/pending-checkout-card";
import { NavRow } from "../../../src/components/nav-row";
import { QueryStateCard } from "../../../src/components/query-state-card";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { StatusPill } from "../../../src/components/status-pill";
import { WalletHeroCard } from "../../../src/components/wallet-hero-card";
import { useActivePendingCheckoutSessions, usePendingCheckoutAssistant } from "../../../src/hooks/use-pending-checkout";
import { getWithdrawalStatusTone } from "../../../src/lib/status-maps";
import { useWalletScreenQuery } from "../../../src/queries/use-mobile-queries";

export default function WalletTabScreen() {
 const walletQuery = useWalletScreenQuery();
 const pendingSessions = useActivePendingCheckoutSessions();
 const latestPendingSession = pendingSessions[0] ?? null;
 const pendingAssistant = usePendingCheckoutAssistant(latestPendingSession);

 return (
 <Screen
 title="Wallet"
 subtitle="Available, pending, and frozen stay visible as separate balances. The visual patch keeps this page trusted and restrained."
 >
 <DemoBanner />

 {latestPendingSession ? (
 <PendingCheckoutCard
 session={latestPendingSession}
 title="Pending payment reminder"
 description="Wallet still stays readonly in the current OpenAPI slice, but the mobile runtime can keep one pending payment reminder visible here too."
 helperText={pendingAssistant.error ?? "This reminder does not mean wallet balances changed. It only helps the user continue provider payment or queue conversion checks."}
 primaryActionLabel={latestPendingSession.queueEntryId ? "Open queue detail" : "Open provider checkout"}
 onPrimaryPress={latestPendingSession.queueEntryId ? pendingAssistant.openQueueDetail : () => void pendingAssistant.openProviderCheckout()}
 secondaryActionLabel={latestPendingSession.queueEntryId ? "Archive local reminder" : "Open payment status check"}
 onSecondaryPress={latestPendingSession.queueEntryId ? pendingAssistant.archive : () => void pendingAssistant.openStatusCheck()}
 tertiaryActionLabel="Dismiss local reminder"
 onTertiaryPress={pendingAssistant.dismiss}
 />
 ) : null}

 {walletQuery.isPending ? (
 <QueryStateCard
 mode="loading"
 title="Preparing wallet overview"
 description="Wallet balances, ledger preview, and withdrawal records now flow through the repository layer."
 />
 ) : null}

 {walletQuery.isError ? (
 <QueryStateCard
 mode="error"
 title="Wallet overview is unavailable"
 description="Retry the readonly wallet query."
 onRetry={() => {
 void walletQuery.refetch();
 }}
 />
 ) : null}

 {walletQuery.data ? (
 <>
 <WalletHeroCard
 availableMinor={walletQuery.data.wallet.availableBalanceMinor}
 pendingMinor={walletQuery.data.wallet.pendingBalanceMinor}
 frozenMinor={walletQuery.data.wallet.frozenBalanceMinor}
 activationLabel={walletQuery.data.wallet.activationLabel}
 onWithdrawPress={() => router.push("/(app)/wallet/withdraw")}
 />

 <SectionCard
 title="Withdrawal records"
 description="Submitted withdrawals freeze available balance until approval or rejection."
 >
 <View style={{ gap: 12 }}>
 {walletQuery.data.withdrawals.map((item: WithdrawalRecordModel) => (
 <SectionCard
 key={item.id}
 variant="muted"
 title={item.id}
 description={formatDateTime(item.createdAt)}
 rightSlot={<StatusPill label={item.status} tone={getWithdrawalStatusTone(item.status)} />}
 >
 <Text>Amount: {formatMinorMoney(item.amountMinor)}</Text>
 </SectionCard>
 ))}
 </View>
 </SectionCard>

 <SectionCard title="Ledger preview" description="Append-only wallet ledger summary. Warning and danger remain text-first, not color-only.">
 <View style={{ gap: 10 }}>
 {walletQuery.data.ledgers.map((ledger: WalletLedgerModel) => (
 <NavRow
 key={ledger.id}
 label={ledger.title}
 description={formatDateTime(ledger.createdAt)}
 rightSlot={<Text>{formatMinorMoney(ledger.amountMinor)}</Text>}
 />
 ))}
 </View>
 </SectionCard>
 </>
 ) : null}
 </Screen>
 );
}