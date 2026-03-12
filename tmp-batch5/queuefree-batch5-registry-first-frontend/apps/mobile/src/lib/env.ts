export const appEnv = {
  appEnv: process.env.EXPO_PUBLIC_APP_ENV ?? 'local',
  apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL ?? 'http://localhost:4000',
  webBaseUrl: process.env.EXPO_PUBLIC_WEB_BASE_URL ?? 'http://localhost:3000',
  sentryDsn: process.env.EXPO_PUBLIC_SENTRY_DSN ?? '',
  posthogKey: process.env.EXPO_PUBLIC_POSTHOG_KEY ?? '',
  posthogHost: process.env.EXPO_PUBLIC_POSTHOG_HOST ?? ''
} as const;
