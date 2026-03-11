export declare const API_PREFIX: "/v1";
export declare const ADMIN_API_PREFIX: "/v1/admin";
export declare const WEB_PUBLIC_ROUTES: {
    readonly home: "/";
    readonly privacy: "/privacy";
    readonly terms: "/terms";
    readonly rules: "/rules";
    readonly rulesQueue: "/rules/queue";
    readonly rulesWallet: "/rules/wallet";
    readonly rulesActivity: "/rules/activity/[slug]";
    readonly deleteAccount: "/delete-account";
    readonly contact: "/contact";
};
export declare const MOBILE_ROUTES: {
    readonly welcome: "/(public)/welcome";
    readonly authPhone: "/(public)/auth/phone";
    readonly authOtp: "/(public)/auth/otp";
    readonly home: "/(app)/(tabs)/home";
    readonly queue: "/(app)/(tabs)/queue";
    readonly tasks: "/(app)/(tabs)/tasks";
    readonly invites: "/(app)/(tabs)/invites";
    readonly wallet: "/(app)/(tabs)/wallet";
    readonly me: "/(app)/(tabs)/me";
    readonly productDetail: "/(app)/product/[productId]";
    readonly checkout: "/(app)/checkout/[productId]";
    readonly orderSuccess: "/(app)/orders/success/[orderId]";
    readonly queueDetail: "/(app)/queue/[entryId]";
    readonly walletWithdraw: "/(app)/wallet/withdraw";
    readonly meAddresses: "/(app)/me/addresses";
    readonly meSecurity: "/(app)/me/security";
    readonly rules: "/(app)/rules";
    readonly rulesQueue: "/(app)/rules/queue";
    readonly rulesWallet: "/(app)/rules/wallet";
    readonly rulesActivity: "/(app)/rules/activity/[campaignId]";
    readonly privacy: "/(app)/privacy";
    readonly terms: "/(app)/terms";
    readonly support: "/(app)/support";
    readonly deleteAccount: "/(app)/delete-account";
};
export declare const ADMIN_ROUTES: {
    readonly login: "/login";
    readonly dashboard: "/";
    readonly products: "/products";
    readonly productDetail: "/products/[productId]";
    readonly orders: "/orders";
    readonly orderDetail: "/orders/[orderId]";
    readonly queues: "/queues";
    readonly queueDetail: "/queues/[entryId]";
    readonly slots: "/slots";
    readonly slotDetail: "/slots/[slotId]";
    readonly campaigns: "/campaigns";
    readonly campaignDetail: "/campaigns/[campaignId]";
    readonly tasks: "/tasks";
    readonly taskDetail: "/tasks/[taskId]";
    readonly invites: "/invites";
    readonly inviteDetail: "/invites/[relationId]";
    readonly wallet: "/wallet";
    readonly withdrawals: "/withdrawals";
    readonly risk: "/risk";
    readonly riskDetail: "/risk/[caseId]";
    readonly governance: "/governance";
    readonly audit: "/audit";
};
export declare const DOMAINS_BY_ENV: {
    readonly local: {
        readonly web: "http://localhost:3000";
        readonly admin: "http://localhost:3001";
        readonly api: "http://localhost:4000";
        readonly assets: "http://localhost:9000";
    };
    readonly dev: {
        readonly web: "https://dev.queuefree.com";
        readonly admin: "https://dev-admin.queuefree.com";
        readonly api: "https://dev-api.queuefree.com";
        readonly assets: "https://dev-assets.queuefree.com";
    };
    readonly staging: {
        readonly web: "https://stg.queuefree.com";
        readonly admin: "https://stg-admin.queuefree.com";
        readonly api: "https://stg-api.queuefree.com";
        readonly assets: "https://stg-assets.queuefree.com";
    };
    readonly prod: {
        readonly web: "https://queuefree.com";
        readonly admin: "https://admin.queuefree.com";
        readonly api: "https://api.queuefree.com";
        readonly assets: "https://assets.queuefree.com";
    };
};
export type AppEnvironment = keyof typeof DOMAINS_BY_ENV;
//# sourceMappingURL=routes.d.ts.map