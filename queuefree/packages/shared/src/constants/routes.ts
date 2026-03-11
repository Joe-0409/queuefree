export const API_PREFIX = '/v1' as const;
export const ADMIN_API_PREFIX = '/v1/admin' as const;

export const WEB_PUBLIC_ROUTES = {
  home: '/',
  privacy: '/privacy',
  terms: '/terms',
  rules: '/rules',
  rulesQueue: '/rules/queue',
  rulesWallet: '/rules/wallet',
  rulesActivity: '/rules/activity/[slug]',
  deleteAccount: '/delete-account',
  contact: '/contact',
} as const;

export const MOBILE_ROUTES = {
  welcome: '/(public)/welcome',
  authPhone: '/(public)/auth/phone',
  authOtp: '/(public)/auth/otp',
  home: '/(app)/(tabs)/home',
  queue: '/(app)/(tabs)/queue',
  tasks: '/(app)/(tabs)/tasks',
  invites: '/(app)/(tabs)/invites',
  wallet: '/(app)/(tabs)/wallet',
  me: '/(app)/(tabs)/me',
  productDetail: '/(app)/product/[productId]',
  checkout: '/(app)/checkout/[productId]',
  orderSuccess: '/(app)/orders/success/[orderId]',
  queueDetail: '/(app)/queue/[entryId]',
  walletWithdraw: '/(app)/wallet/withdraw',
  meAddresses: '/(app)/me/addresses',
  meSecurity: '/(app)/me/security',
  rules: '/(app)/rules',
  rulesQueue: '/(app)/rules/queue',
  rulesWallet: '/(app)/rules/wallet',
  rulesActivity: '/(app)/rules/activity/[campaignId]',
  privacy: '/(app)/privacy',
  terms: '/(app)/terms',
  support: '/(app)/support',
  deleteAccount: '/(app)/delete-account',
} as const;

export const ADMIN_ROUTES = {
  login: '/login',
  dashboard: '/',
  products: '/products',
  productDetail: '/products/[productId]',
  orders: '/orders',
  orderDetail: '/orders/[orderId]',
  queues: '/queues',
  queueDetail: '/queues/[entryId]',
  slots: '/slots',
  slotDetail: '/slots/[slotId]',
  campaigns: '/campaigns',
  campaignDetail: '/campaigns/[campaignId]',
  tasks: '/tasks',
  taskDetail: '/tasks/[taskId]',
  invites: '/invites',
  inviteDetail: '/invites/[relationId]',
  wallet: '/wallet',
  withdrawals: '/withdrawals',
  risk: '/risk',
  riskDetail: '/risk/[caseId]',
  governance: '/governance',
  audit: '/audit',
} as const;

export const DOMAINS_BY_ENV = {
  local: {
    web: 'http://localhost:3000',
    admin: 'http://localhost:3001',
    api: 'http://localhost:4000',
    assets: 'http://localhost:9000',
  },
  dev: {
    web: 'https://dev.queuefree.com',
    admin: 'https://dev-admin.queuefree.com',
    api: 'https://dev-api.queuefree.com',
    assets: 'https://dev-assets.queuefree.com',
  },
  staging: {
    web: 'https://stg.queuefree.com',
    admin: 'https://stg-admin.queuefree.com',
    api: 'https://stg-api.queuefree.com',
    assets: 'https://stg-assets.queuefree.com',
  },
  prod: {
    web: 'https://queuefree.com',
    admin: 'https://admin.queuefree.com',
    api: 'https://api.queuefree.com',
    assets: 'https://assets.queuefree.com',
  },
} as const;

export type AppEnvironment = keyof typeof DOMAINS_BY_ENV;
