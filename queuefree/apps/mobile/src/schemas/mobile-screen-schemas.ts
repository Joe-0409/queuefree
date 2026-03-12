import {
  ACCOUNT_DELETE_STATUSES,
  INVITE_RELATION_STATUSES,
  QUEUE_ENTRY_STATUSES,
  USER_QUEUE_GUARD_STATUSES,
  WITHDRAWAL_STATUSES
} from '@queuefree/shared';
import { z } from 'zod';

const moneyMinorSchema = z.number().int();
const nonEmptyStringSchema = z.string().min(1);

export const productCardSchema = z.object({
  id: nonEmptyStringSchema,
  title: nonEmptyStringSchema,
  subtitle: nonEmptyStringSchema,
  priceMinor: moneyMinorSchema,
  cashbackCapMinor: moneyMinorSchema,
  stockLabel: nonEmptyStringSchema
});

export const queueEntryCardSchema = z.object({
  id: nonEmptyStringSchema,
  orderId: nonEmptyStringSchema,
  productTitle: nonEmptyStringSchema,
  status: z.enum(QUEUE_ENTRY_STATUSES),
  currentRank: z.number().int().nullable(),
  boostUsed: z.number().int().min(0),
  nextSlotAt: nonEmptyStringSchema,
  eligibleCashbackMinor: moneyMinorSchema
});

export const taskCardSchema = z.object({
  id: nonEmptyStringSchema,
  title: nonEmptyStringSchema,
  rewardLabel: nonEmptyStringSchema,
  progressLabel: nonEmptyStringSchema,
  claimable: z.boolean()
});

export const inviteRecordSchema = z.object({
  id: nonEmptyStringSchema,
  maskedPhone: nonEmptyStringSchema,
  status: z.enum(INVITE_RELATION_STATUSES),
  reason: nonEmptyStringSchema
});

export const walletLedgerSchema = z.object({
  id: nonEmptyStringSchema,
  title: nonEmptyStringSchema,
  amountMinor: moneyMinorSchema,
  createdAt: nonEmptyStringSchema
});

export const withdrawalRecordSchema = z.object({
  id: nonEmptyStringSchema,
  amountMinor: moneyMinorSchema,
  status: z.enum(WITHDRAWAL_STATUSES),
  createdAt: nonEmptyStringSchema
});

export const profileSchema = z.object({
  displayName: nonEmptyStringSchema,
  phoneNumber: nonEmptyStringSchema,
  marketLabel: nonEmptyStringSchema,
  timezoneLabel: nonEmptyStringSchema
});

export const guardSchema = z.object({
  status: z.enum(USER_QUEUE_GUARD_STATUSES),
  validUntil: nonEmptyStringSchema,
  graceUntil: nonEmptyStringSchema
});

export const walletSummarySchema = z.object({
  activationLabel: nonEmptyStringSchema,
  pendingBalanceMinor: moneyMinorSchema,
  availableBalanceMinor: moneyMinorSchema,
  frozenBalanceMinor: moneyMinorSchema,
  showRecoverableDebtHint: z.boolean()
});

export const homeScreenDataSchema = z.object({
  products: z.array(productCardSchema),
  nextSlotAt: z.string().min(1).nullable()
});

export const queueScreenDataSchema = z.object({
  guard: guardSchema,
  entries: z.array(queueEntryCardSchema)
});

export const tasksScreenDataSchema = z.object({
  tasks: z.array(taskCardSchema)
});

export const invitesScreenDataSchema = z.object({
  inviteCode: nonEmptyStringSchema,
  records: z.array(inviteRecordSchema)
});

export const walletScreenDataSchema = z.object({
  wallet: walletSummarySchema,
  ledgers: z.array(walletLedgerSchema),
  withdrawals: z.array(withdrawalRecordSchema)
});

export const profileScreenDataSchema = z.object({
  profile: profileSchema
});

export const rulesCenterDataSchema = z.object({
  faq: z.array(nonEmptyStringSchema)
});

export const orderSuccessDataSchema = z.object({
  entryId: nonEmptyStringSchema,
  summary: z.object({
    title: nonEmptyStringSchema,
    rankLabel: nonEmptyStringSchema,
    nextSlotLabel: nonEmptyStringSchema,
    cashbackLabel: nonEmptyStringSchema
  })
});

export const deleteAccountPreviewDataSchema = z.object({
  statuses: z.tuple([
    z.literal(ACCOUNT_DELETE_STATUSES[0]),
    z.literal(ACCOUNT_DELETE_STATUSES[1]),
    z.literal(ACCOUNT_DELETE_STATUSES[2]),
    z.literal(ACCOUNT_DELETE_STATUSES[3]),
    z.literal(ACCOUNT_DELETE_STATUSES[4]),
    z.literal(ACCOUNT_DELETE_STATUSES[5])
  ]),
  blockers: z.array(nonEmptyStringSchema),
  impactNotes: z.array(nonEmptyStringSchema)
});
