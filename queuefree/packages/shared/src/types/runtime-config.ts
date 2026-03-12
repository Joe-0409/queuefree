export type PublicRouteMap = {
  privacy: string;
  terms: string;
  rules: string;
  deleteAccount: string;
  contact: string;
};

export type RuntimeConfig = {
  ruleVersion: string;
  marketCode: string;
  currencyCode: string;
  timezone: string;
  locale: string;
  unpaidOrderExpireMinutes: number;
  stockSoftReserveMinutes: number;
  baseGuardHours: number;
  freezeGraceHours: number;
  adGuardBonusHours: number;
  protectZoneSize: number;
  boostLimitPerEntry: number;
  boostFragmentPerToken: number;
  observationHoursAfterDelivery: number;
  inviteBindWindowHours: number;
  defaultCashbackCapMinor: number;
  withdrawMinAmountMinor: number;
  withdrawSingleMaxMinor: number;
  withdrawDailyMaxMinor: number;
  defaultOrderMaxQty: number;
  defaultDailySlotCount: number;
  rewardedAdsEnabled: boolean;
  publicWebBaseUrl: string;
  publicRoutes: PublicRouteMap;
};
