import { z } from 'zod';
export declare const publicRoutesSchema: z.ZodObject<{
    privacy: z.ZodLiteral<"/privacy">;
    terms: z.ZodLiteral<"/terms">;
    rules: z.ZodLiteral<"/rules">;
    deleteAccount: z.ZodLiteral<"/delete-account">;
    contact: z.ZodLiteral<"/contact">;
}, "strip", z.ZodTypeAny, {
    privacy: "/privacy";
    terms: "/terms";
    rules: "/rules";
    deleteAccount: "/delete-account";
    contact: "/contact";
}, {
    privacy: "/privacy";
    terms: "/terms";
    rules: "/rules";
    deleteAccount: "/delete-account";
    contact: "/contact";
}>;
export declare const runtimeConfigSchema: z.ZodObject<{
    ruleVersion: z.ZodLiteral<"v1.2">;
    marketCode: z.ZodLiteral<"PH">;
    currencyCode: z.ZodLiteral<"PHP">;
    timezone: z.ZodLiteral<"Asia/Manila">;
    locale: z.ZodLiteral<"en-PH">;
    unpaidOrderExpireMinutes: z.ZodNumber;
    stockSoftReserveMinutes: z.ZodNumber;
    baseGuardHours: z.ZodNumber;
    freezeGraceHours: z.ZodNumber;
    adGuardBonusHours: z.ZodNumber;
    protectZoneSize: z.ZodNumber;
    boostLimitPerEntry: z.ZodNumber;
    boostFragmentPerToken: z.ZodNumber;
    observationHoursAfterDelivery: z.ZodNumber;
    inviteBindWindowHours: z.ZodNumber;
    defaultCashbackCapMinor: z.ZodNumber;
    withdrawMinAmountMinor: z.ZodNumber;
    withdrawSingleMaxMinor: z.ZodNumber;
    withdrawDailyMaxMinor: z.ZodNumber;
    defaultOrderMaxQty: z.ZodNumber;
    defaultDailySlotCount: z.ZodNumber;
    rewardedAdsEnabled: z.ZodBoolean;
    publicWebBaseUrl: z.ZodString;
    publicRoutes: z.ZodObject<{
        privacy: z.ZodLiteral<"/privacy">;
        terms: z.ZodLiteral<"/terms">;
        rules: z.ZodLiteral<"/rules">;
        deleteAccount: z.ZodLiteral<"/delete-account">;
        contact: z.ZodLiteral<"/contact">;
    }, "strip", z.ZodTypeAny, {
        privacy: "/privacy";
        terms: "/terms";
        rules: "/rules";
        deleteAccount: "/delete-account";
        contact: "/contact";
    }, {
        privacy: "/privacy";
        terms: "/terms";
        rules: "/rules";
        deleteAccount: "/delete-account";
        contact: "/contact";
    }>;
}, "strip", z.ZodTypeAny, {
    ruleVersion: "v1.2";
    marketCode: "PH";
    currencyCode: "PHP";
    timezone: "Asia/Manila";
    locale: "en-PH";
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
    publicRoutes: {
        privacy: "/privacy";
        terms: "/terms";
        rules: "/rules";
        deleteAccount: "/delete-account";
        contact: "/contact";
    };
}, {
    ruleVersion: "v1.2";
    marketCode: "PH";
    currencyCode: "PHP";
    timezone: "Asia/Manila";
    locale: "en-PH";
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
    publicRoutes: {
        privacy: "/privacy";
        terms: "/terms";
        rules: "/rules";
        deleteAccount: "/delete-account";
        contact: "/contact";
    };
}>;
export type RuntimeConfigSchema = z.infer<typeof runtimeConfigSchema>;
//# sourceMappingURL=runtime-config.schema.d.ts.map