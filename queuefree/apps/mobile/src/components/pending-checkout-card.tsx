import { StyleSheet, Text, View } from "react-native";
import { formatDateTime, formatMinorMoney } from "@queuefree/shared";
import { mobileTheme } from "@queuefree/ui-tokens";
import { KeyValueRow } from "./key-value-row";
import { PrimaryButton } from "./primary-button";
import { SectionCard } from "./section-card";
import { StatusPill } from "./status-pill";
import type { PendingCheckoutSession } from "../store/pending-checkout-store";

function getLifecycleTone(lifecycle: PendingCheckoutSession["lifecycle"]) {
 switch (lifecycle) {
 case "QUEUE_ENTRY_VISIBLE":
 return "success" as const;
 case "AWAITING_QUEUE_ENTRY":
 return "warning" as const;
 case "PROVIDER_OPENED":
 return "brand" as const;
 case "PENDING_PAYMENT":
 return "neutral" as const;
 default:
 return "neutral" as const;
 }
}

function getLifecycleLabel(lifecycle: PendingCheckoutSession["lifecycle"]) {
 switch (lifecycle) {
 case "PENDING_PAYMENT":
 return "Pending payment";
 case "PROVIDER_OPENED":
 return "Provider opened";
 case "AWAITING_QUEUE_ENTRY":
 return "Waiting for queue entry";
 case "QUEUE_ENTRY_VISIBLE":
 return "Queue entry visible";
 case "ARCHIVED":
 return "Archived";
 default:
 return lifecycle;
 }
}

type PendingCheckoutCardProps = {
 session: PendingCheckoutSession;
 title?: string;
 description?: string;
 helperText?: string;
 primaryActionLabel?: string;
 onPrimaryPress?: () => void;
 secondaryActionLabel?: string;
 onSecondaryPress?: () => void;
 tertiaryActionLabel?: string;
 onTertiaryPress?: () => void;
};

export function PendingCheckoutCard({
 session,
 title = "Pending checkout",
 description = "This reminder stays inside the mobile app runtime only. It helps the user reopen provider checkout or continue the queue conversion check.",
 helperText,
 primaryActionLabel,
 onPrimaryPress,
 secondaryActionLabel,
 onSecondaryPress,
 tertiaryActionLabel,
 onTertiaryPress
}: PendingCheckoutCardProps) {
 return (
 <SectionCard
 title={title}
 description={description}
 rightSlot={<StatusPill label={getLifecycleLabel(session.lifecycle)} tone={getLifecycleTone(session.lifecycle)} />}
 >
 <KeyValueRow label="Product" value={session.productTitle} />
 <KeyValueRow label="Order ID" value={session.orderId} />
 <KeyValueRow label="Provider" value={session.provider} />
 <KeyValueRow label="Amount" value={formatMinorMoney(session.amountMinor, session.currencyCode)} emphasize />
 <KeyValueRow label="Quantity" value={String(session.quantity)} />
 <KeyValueRow label="Started" value={formatDateTime(session.createdAt)} />
 {session.lastOpenedAt ? <KeyValueRow label="Last provider open" value={formatDateTime(session.lastOpenedAt)} /> : null}
 {session.lastCheckedAt ? <KeyValueRow label="Last status check" value={formatDateTime(session.lastCheckedAt)} /> : null}
 {session.queueEntryId ? <KeyValueRow label="Queue entry ID" value={session.queueEntryId} /> : null}
 {helperText ? <Text style={styles.helper}>{helperText}</Text> : null}

 {primaryActionLabel || secondaryActionLabel || tertiaryActionLabel ? (
 <View style={styles.actions}>
 {primaryActionLabel && onPrimaryPress ? <PrimaryButton label={primaryActionLabel} variant="promo" onPress={onPrimaryPress} /> : null}
 {secondaryActionLabel && onSecondaryPress ? <PrimaryButton label={secondaryActionLabel} variant="secondary" onPress={onSecondaryPress} /> : null}
 {tertiaryActionLabel && onTertiaryPress ? <PrimaryButton label={tertiaryActionLabel} variant="secondary" onPress={onTertiaryPress} /> : null}
 </View>
 ) : null}
 </SectionCard>
 );
}

const styles = StyleSheet.create({
 helper: {
 color: mobileTheme.colors.textSecondary,
 fontSize: 13,
 lineHeight: 18
 },
 actions: {
 gap: mobileTheme.spacing.sm,
 marginTop: mobileTheme.spacing.xs
 }
});