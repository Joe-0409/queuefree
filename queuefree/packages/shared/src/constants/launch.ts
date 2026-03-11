export const RULE_VERSION = 'v1.2' as const;

export const LAUNCH_MARKET_CODE = 'PH' as const;
export const LAUNCH_CURRENCY_CODE = 'PHP' as const;
export const LAUNCH_TIMEZONE = 'Asia/Manila' as const;
export const LAUNCH_LANGUAGE = 'English' as const;
export const LAUNCH_LOCALE = 'en-PH' as const;

export const PUBLIC_WEBSITE_DOMAIN = 'queuefree.com' as const;
export const PUBLIC_API_DOMAIN = 'api.queuefree.com' as const;
export const PUBLIC_ADMIN_DOMAIN = 'admin.queuefree.com' as const;
export const PUBLIC_ASSETS_DOMAIN = 'assets.queuefree.com' as const;

export const LAUNCH_BASELINE = {
  marketCode: LAUNCH_MARKET_CODE,
  currencyCode: LAUNCH_CURRENCY_CODE,
  timezone: LAUNCH_TIMEZONE,
  language: LAUNCH_LANGUAGE,
  locale: LAUNCH_LOCALE,
  ruleVersion: RULE_VERSION,
  websiteDomain: PUBLIC_WEBSITE_DOMAIN,
  apiDomain: PUBLIC_API_DOMAIN,
  adminDomain: PUBLIC_ADMIN_DOMAIN,
  assetsDomain: PUBLIC_ASSETS_DOMAIN,
} as const;
