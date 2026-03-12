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
import {
  deleteAccountPreviewDataSchema,
  homeScreenDataSchema,
  invitesScreenDataSchema,
  orderSuccessDataSchema,
  productCardSchema,
  profileScreenDataSchema,
  queueEntryCardSchema,
  queueScreenDataSchema,
  rulesCenterDataSchema,
  tasksScreenDataSchema,
  walletScreenDataSchema
} from '../schemas/mobile-screen-schemas';

function formatIssues(issues: Array<{ path: (string | number)[]; message: string }>) {
  return issues
    .slice(0, 5)
    .map((issue) => `${issue.path.join('.') || '<root>'}: ${issue.message}`)
    .join('; ');
}

function parseOrThrow<T>(
  label: string,
  parseFn: (value: unknown) => { success: true; data: T } | { success: false; error: { issues: Array<{ path: (string | number)[]; message: string }> } },
  value: unknown
): T {
  const result = parseFn(value);

  if (!result.success) {
    throw new Error(`[QueueFree mobile skeleton] ${label} failed screen-model validation. ${formatIssues(result.error.issues)}`);
  }

  return result.data;
}

export function validateHomeScreenData(value: unknown): HomeScreenData {
  return parseOrThrow('fetchHomeScreenData', homeScreenDataSchema.safeParse.bind(homeScreenDataSchema), value);
}

export function validateQueueScreenData(value: unknown): QueueScreenData {
  return parseOrThrow('fetchQueueScreenData', queueScreenDataSchema.safeParse.bind(queueScreenDataSchema), value);
}

export function validateTasksScreenData(value: unknown): TasksScreenData {
  return parseOrThrow('fetchTasksScreenData', tasksScreenDataSchema.safeParse.bind(tasksScreenDataSchema), value);
}

export function validateInvitesScreenData(value: unknown): InvitesScreenData {
  return parseOrThrow('fetchInvitesScreenData', invitesScreenDataSchema.safeParse.bind(invitesScreenDataSchema), value);
}

export function validateWalletScreenData(value: unknown): WalletScreenData {
  return parseOrThrow('fetchWalletScreenData', walletScreenDataSchema.safeParse.bind(walletScreenDataSchema), value);
}

export function validateProfileScreenData(value: unknown): ProfileScreenData {
  return parseOrThrow('fetchProfileScreenData', profileScreenDataSchema.safeParse.bind(profileScreenDataSchema), value);
}

export function validateProductCard(value: unknown): ProductCardModel {
  return parseOrThrow('fetchProductDetail', productCardSchema.safeParse.bind(productCardSchema), value);
}

export function validateQueueEntryCard(value: unknown): QueueEntryCardModel {
  return parseOrThrow('fetchQueueEntryDetail', queueEntryCardSchema.safeParse.bind(queueEntryCardSchema), value);
}

export function validateRulesCenterData(value: unknown): RulesCenterData {
  return parseOrThrow('fetchRulesCenterData', rulesCenterDataSchema.safeParse.bind(rulesCenterDataSchema), value);
}

export function validateOrderSuccessData(value: unknown): OrderSuccessData {
  return parseOrThrow('fetchOrderSuccessData', orderSuccessDataSchema.safeParse.bind(orderSuccessDataSchema), value);
}

export function validateDeleteAccountPreviewData(value: unknown): DeleteAccountPreviewData {
  return parseOrThrow(
    'fetchDeleteAccountPreview',
    deleteAccountPreviewDataSchema.safeParse.bind(deleteAccountPreviewDataSchema),
    value
  );
}
