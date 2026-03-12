import { z } from "zod";

export const publicRouteMapSchema = z.object({
  privacy: z.string().min(1),
  terms: z.string().min(1),
  rules: z.string().min(1),
  deleteAccount: z.string().min(1),
  contact: z.string().min(1)
});

export const runtimeConfigSchema = z.object({
  ruleVersion: z.string().min(1),
  marketCode: z.string().min(1),
  currencyCode: z.string().min(1),
  timezone: z.string().min(1),
  locale: z.string().min(1),
  unpaidOrderExpireMinutes: z.number().int().positive(),
  stockSoftReserveMinutes: z.number().int().positive(),
  baseGuardHours: z.number().int().positive(),
  freezeGraceHours: z.number().int().positive(),
  adGuardBonusHours: z.number().int().nonnegative(),
  protectZoneSize: z.number().int().positive(),
  boostLimitPerEntry: z.number().int().positive(),
  boostFragmentPerToken: z.number().int().positive(),
  observationHoursAfterDelivery: z.number().int().positive(),
  inviteBindWindowHours: z.number().int().positive(),
  defaultCashbackCapMinor: z.number().int().nonnegative(),
  withdrawMinAmountMinor: z.number().int().nonnegative(),
  withdrawSingleMaxMinor: z.number().int().nonnegative(),
  withdrawDailyMaxMinor: z.number().int().nonnegative(),
  defaultOrderMaxQty: z.number().int().positive(),
  defaultDailySlotCount: z.number().int().positive(),
  rewardedAdsEnabled: z.boolean(),
  publicWebBaseUrl: z.string().min(1),
  publicRoutes: publicRouteMapSchema
});

export type RuntimeConfigSchema = z.infer<typeof runtimeConfigSchema>;
