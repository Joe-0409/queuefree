import {
  LAUNCH_CURRENCY,
  LAUNCH_LOCALE,
  LAUNCH_MARKET,
  LAUNCH_RULE_VERSION,
  LAUNCH_TIMEZONE,
  LAUNCH_WEBSITE
} from "./launch";
import type { RuntimeConfig } from "../types/runtime-config";
import { runtimeConfigSchema } from "../schemas/runtime-config.schema";

export const DEFAULT_RUNTIME_CONFIG: RuntimeConfig = runtimeConfigSchema.parse({
  ruleVersion: LAUNCH_RULE_VERSION,
  marketCode: LAUNCH_MARKET,
  currencyCode: LAUNCH_CURRENCY,
  timezone: LAUNCH_TIMEZONE,
  locale: LAUNCH_LOCALE,
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
  publicWebBaseUrl: `https://${LAUNCH_WEBSITE}`,
  publicRoutes: {
    privacy: `https://${LAUNCH_WEBSITE}/privacy`,
    terms: `https://${LAUNCH_WEBSITE}/terms`,
    rules: `https://${LAUNCH_WEBSITE}/rules`,
    deleteAccount: `https://${LAUNCH_WEBSITE}/delete-account`,
    contact: `https://${LAUNCH_WEBSITE}/contact`
  }
});
