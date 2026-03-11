import { RULE_VERSION } from './launch';
import { WEB_PUBLIC_ROUTES } from './routes';
/**
 * 说明：
 * 1. 这是 shared 层的默认 fallback。
 * 2. 长期真相源仍然必须是服务端 runtime config。
 * 3. 前端禁止在页面内自行再硬编码一份不同阈值。
 */
export const DEFAULT_RUNTIME_CONFIG = {
    ruleVersion: RULE_VERSION,
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
        privacy: WEB_PUBLIC_ROUTES.privacy,
        terms: WEB_PUBLIC_ROUTES.terms,
        rules: WEB_PUBLIC_ROUTES.rules,
        deleteAccount: WEB_PUBLIC_ROUTES.deleteAccount,
        contact: WEB_PUBLIC_ROUTES.contact,
    },
};
//# sourceMappingURL=runtime-config-defaults.js.map