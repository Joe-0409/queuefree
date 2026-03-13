import { ACCOUNT_DELETE_STATUSES } from '@queuefree/shared';
import {
 demoGuard,
 demoInviteRecords,
 demoLedgers,
 demoProducts,
 demoProfile,
 demoQueueEntries,
 demoRuleFaq,
 demoTasks,
 demoWallet,
 demoWithdrawals,
 formatQueueEntrySummary,
 getProductById,
 getQueueEntryById
} from '../lib/demo-data';
import { waitForMock } from '../lib/mock-delay';
import type { MobileReadAdapter } from './mobile-read-adapter';

export const mockMobileReadAdapter: MobileReadAdapter = {
 async fetchHomeScreenData() {
 await waitForMock();
 return {
 products: demoProducts,
 nextSlotAt: demoQueueEntries[0]?.nextSlotAt ?? null
 };
 },

 async fetchQueueScreenData() {
 await waitForMock();
 return {
 guard: demoGuard,
 entries: demoQueueEntries
 };
 },

 async fetchTasksScreenData() {
 await waitForMock();
 return {
 tasks: demoTasks
 };
 },

 async fetchInvitesScreenData() {
 await waitForMock();
 return {
 inviteCode: 'QUEUEFREE2026',
 records: demoInviteRecords
 };
 },

 async fetchWalletScreenData() {
 await waitForMock();
 return {
 wallet: demoWallet,
 ledgers: demoLedgers,
 withdrawals: demoWithdrawals
 };
 },

 async fetchProfileScreenData() {
 await waitForMock();
 return {
 profile: demoProfile
 };
 },

 async fetchProductDetail(productId: string) {
 await waitForMock();
 return getProductById(productId);
 },

 async fetchQueueEntryDetail(entryId: string) {
 await waitForMock();
 return getQueueEntryById(entryId);
 },

 async fetchRulesCenterData() {
 await waitForMock();
 return {
 faq: demoRuleFaq
 };
 },

 async fetchOrderSuccessData(orderId: string) {
 await waitForMock();
 const entryId = demoQueueEntries[0]?.id ?? 'entry-1001';

 return {
 orderId,
 state: 'QUEUE_CREATED',
 entryId,
 summary: formatQueueEntrySummary(entryId),
 helperText: 'Queue entry is already visible in the mock adapter.'
 };
 },

 async fetchDeleteAccountPreview() {
 await waitForMock();
 return {
 statuses: ACCOUNT_DELETE_STATUSES,
 blockers: [
 'Active or frozen queue entries may block immediate anonymization.',
 'Pending, available, or frozen wallet balances must settle first.',
 'Withdrawal processing and after-sales review may delay final anonymization.'
 ],
 impactNotes: [
 'Queue entries may be removed or settled according to the locked rules.',
 'Financial, order, risk, and audit records may retain irreversible reference IDs.',
 'MVP deletion is request + settlement + anonymization, not a simple disable switch.'
 ]
 };
 }
};