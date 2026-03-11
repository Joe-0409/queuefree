import { runtimeConfigSchema } from '../schemas/runtime-config.schema';
import type { RuntimeConfig } from '../types/runtime-config';

export const DEFAULT_RUNTIME_CONFIG: RuntimeConfig = runtimeConfigSchema.parse({
  ruleVersion: 'v1.2',
  marketCode: 'PH',
  currencyCode: 'PHP',
  timezone: 'Asia/Manila',
  locale: 'en-PH',
  unpaidOrderExpireMinutes: 15,
  stockSoftReserveMinutes: 15,
  baseGuardHours: 36,
  freezeGraceHours: 72,
  adGuardBonusHours: 12,
  protectZoneSize: 30,
  boostLimitPerEntry: 2,
  boostFragmentPerToken: 3,
  observationHoursAfterDelivery: 48,
  inviteBindWindowHours: 72,
  defaultCashbackCapMinor: 200000,
  withdrawMinAmountMinor: 30000,
  withdrawSingleMaxMinor: 500000,
  withdrawDailyMaxMinor: 1000000,
  defaultOrderMaxQty: 5,
  defaultDailySlotCount: 3,
  rewardedAdsEnabled: false,
  publicWebBaseUrl: 'https://queuefree.com',
  publicRoutes: {
    privacy: '/privacy',
    terms: '/terms',
    rules: '/rules',
    deleteAccount: '/delete-account',
    contact: '/contact'
  }
});
