import {
 ACCOUNT_DELETE_STATUSES,
 DEFAULT_RUNTIME_CONFIG,
 LAUNCH_MARKET,
 LAUNCH_TIMEZONE,
 formatDateTime,
 formatMinorMoney
} from '@queuefree/shared';
import type {
 DeleteAccountPreviewData,
 HomeScreenData,
 InvitesScreenData,
 OrderSuccessData,
 ProfileScreenData,
 QueueScreenData,
 RulesCenterData,
 TasksScreenData,
 WalletScreenData
} from '../adapters/mobile-read-adapter';
import type {
 ProductCardModel,
 QueueEntryCardModel
} from '../models/mobile-screen-models';
import type {
 DeleteAccountPreviewGeneratedSource,
 HomeScreenGeneratedSource,
 InvitesScreenGeneratedSource,
 OrderSuccessGeneratedSource,
 ProductDetailGeneratedSource,
 ProfileScreenGeneratedSource,
 QueueEntryDetailGeneratedSource,
 QueueScreenGeneratedSource,
 RulesCenterGeneratedSource,
 TasksScreenGeneratedSource,
 WalletScreenGeneratedSource
} from './mobile-generated-fetchers';

function buildProductSubtitle(isQueueEligible: boolean, description?: string) {
 if (description && description.trim()) {
 return description;
 }

 return isQueueEligible ? 'Real product · Queue eligible' : 'Real product · Direct checkout only';
}

function buildStockLabel(maxQty: number, isQueueEligible: boolean) {
 return isQueueEligible ? `Queue eligible · Max ${maxQty} per order` : `Queue closed · Max ${maxQty} per order`;
}

function mapProductListItemToCard(item: HomeScreenGeneratedSource['products']['items'][number]): ProductCardModel {
 return {
 id: item.productId,
 title: item.title,
 subtitle: buildProductSubtitle(item.isQueueEligible),
 priceMinor: item.priceMinor,
 cashbackCapMinor: DEFAULT_RUNTIME_CONFIG.defaultCashbackCapMinor,
 stockLabel: buildStockLabel(item.maxQty, item.isQueueEligible)
 };
}

function mapQueueListItemToCard(
 item: QueueScreenGeneratedSource['queueEntries']['items'][number],
 nextSlotAt: string
): QueueEntryCardModel {
 return {
 id: item.queueEntryId,
 orderId: item.orderId,
 productTitle: item.productTitle,
 status: item.status,
 currentRank: item.activeRank,
 boostUsed: item.boostUsedCount,
 nextSlotAt,
 eligibleCashbackMinor: item.wonCashbackAmountMinor ?? DEFAULT_RUNTIME_CONFIG.defaultCashbackCapMinor
 };
}

export function mapGeneratedHomeScreenDataPayload(source: HomeScreenGeneratedSource): HomeScreenData {
 return {
 products: source.products.items.map(mapProductListItemToCard),
 nextSlotAt: source.queueGuard.validUntil
 };
}

export function mapGeneratedQueueScreenDataPayload(source: QueueScreenGeneratedSource): QueueScreenData {
 return {
 guard: {
 status: source.queueGuard.status,
 validUntil: source.queueGuard.validUntil,
 graceUntil: source.queueGuard.graceUntil ?? source.queueGuard.validUntil
 },
 entries: source.queueEntries.items.map((item) => mapQueueListItemToCard(item, source.queueGuard.validUntil))
 };
}

export function mapGeneratedTasksScreenDataPayload(source: TasksScreenGeneratedSource): TasksScreenData {
 return source;
}

export function mapGeneratedInvitesScreenDataPayload(source: InvitesScreenGeneratedSource): InvitesScreenData {
 return source;
}

export function mapGeneratedWalletScreenDataPayload(source: WalletScreenGeneratedSource): WalletScreenData {
 return source;
}

export function mapGeneratedProfileScreenDataPayload(source: ProfileScreenGeneratedSource): ProfileScreenData {
 const { meOverview, runtimeConfig } = source;
 const displayName = meOverview.userId
 ? `QueueFree Member ${meOverview.userId.slice(-4).toUpperCase()}`
 : 'QueueFree Member';

 return {
 profile: {
 displayName,
 phoneNumber: meOverview.phoneMasked,
 marketLabel: `${runtimeConfig.marketCode} · ${runtimeConfig.currencyCode}`,
 timezoneLabel: runtimeConfig.timezone
 }
 };
}

export function mapGeneratedProductDetailPayload(source: ProductDetailGeneratedSource): ProductCardModel {
 const { product } = source;
 return {
 id: product.productId,
 title: product.title,
 subtitle: buildProductSubtitle(product.isQueueEligible, product.description),
 priceMinor: product.priceMinor,
 cashbackCapMinor: DEFAULT_RUNTIME_CONFIG.defaultCashbackCapMinor,
 stockLabel: buildStockLabel(product.maxQty, product.isQueueEligible)
 };
}

export function mapGeneratedQueueEntryDetailPayload(source: QueueEntryDetailGeneratedSource): QueueEntryCardModel {
 const { queueEntry, queueGuard } = source;

 return {
 id: queueEntry.queueEntryId,
 orderId: queueEntry.orderId,
 productTitle: queueEntry.productTitle,
 status: queueEntry.status,
 currentRank: queueEntry.activeRank,
 boostUsed: queueEntry.boostUsedCount,
 nextSlotAt: queueGuard.validUntil,
 eligibleCashbackMinor: queueEntry.wonCashbackAmountMinor ?? DEFAULT_RUNTIME_CONFIG.defaultCashbackCapMinor
 };
}

export function mapGeneratedRulesCenterDataPayload(source: RulesCenterGeneratedSource): RulesCenterData {
 const faq = source.rules.map((rule) => `${rule.title} — ${rule.summary}`);

 if (source.highlightedRule && source.highlightedRule.sections.length > 0) {
 faq.unshift(`${source.highlightedRule.title} — ${source.highlightedRule.sections[0]}`);
 }

 return {
 faq: faq.slice(0, 7)
 };
}

export function mapGeneratedOrderSuccessDataPayload(source: OrderSuccessGeneratedSource): OrderSuccessData {
 const matchingEntry = source.queueEntries.items.find((entry) => entry.orderId === source.orderId) ?? null;

 if (!matchingEntry) {
 return {
 orderId: source.orderId,
 state: 'AWAITING_QUEUE_ENTRY',
 entryId: null,
 summary: {
 title: 'Payment received · waiting for queue entry',
 rankLabel: 'Queue entry pending',
 nextSlotLabel: formatDateTime(source.queueGuard.validUntil),
 cashbackLabel: formatMinorMoney(DEFAULT_RUNTIME_CONFIG.defaultCashbackCapMinor)
 },
 helperText: 'Payment may already be accepted by the provider, but the queue entry is not visible yet. Refresh queue or retry the status check shortly.'
 };
 }

 return {
 orderId: source.orderId,
 state: 'QUEUE_CREATED',
 entryId: matchingEntry.queueEntryId,
 summary: {
 title: matchingEntry.productTitle,
 rankLabel: matchingEntry.activeRank ? `#${matchingEntry.activeRank}` : 'Not ranked',
 nextSlotLabel: formatDateTime(source.queueGuard.validUntil),
 cashbackLabel: formatMinorMoney(matchingEntry.wonCashbackAmountMinor ?? DEFAULT_RUNTIME_CONFIG.defaultCashbackCapMinor)
 },
 helperText: 'Queue entry is visible. You can open queue detail and continue the normal queue journey.'
 };
}

export function mapGeneratedDeleteAccountPreviewPayload(source: DeleteAccountPreviewGeneratedSource): DeleteAccountPreviewData {
 const statusLabel = source.meOverview.accountDeleteStatus;

 return {
 statuses: ACCOUNT_DELETE_STATUSES,
 blockers: [
 `Current delete status from readonly overview: ${statusLabel}.`,
 'Active or frozen queue entries may delay final anonymization until settlement rules are satisfied.',
 'Wallet, withdrawal, after-sale, and audit records still follow settlement-first retention rules.'
 ],
 impactNotes: [
 `Launch market remains ${LAUNCH_MARKET} and timezone remains ${LAUNCH_TIMEZONE}.`,
 'Deletion stays request + settlement + anonymization, not an immediate soft delete.',
 'This readonly batch only surfaces guidance. The actual delete request mutation remains out of scope.'
 ]
 };
}