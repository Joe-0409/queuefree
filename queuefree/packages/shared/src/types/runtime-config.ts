export interface RuntimeConfigPublicRoutes {
  privacy: '/privacy';
  terms: '/terms';
  rules: '/rules';
  deleteAccount: '/delete-account';
  contact: '/contact';
}

export interface RuntimeConfig {
  ruleVersion: 'v1.2';
  marketCode: 'PH';
  currencyCode: 'PHP';
  timezone: 'Asia/Manila';
  locale: 'en-PH';
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
  publicRoutes: RuntimeConfigPublicRoutes;
}
