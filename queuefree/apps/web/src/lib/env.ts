export const publicAppEnv = {
  appEnv: process.env.NEXT_PUBLIC_APP_ENV ?? 'local',
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:4000',
  webBaseUrl: process.env.NEXT_PUBLIC_WEB_BASE_URL ?? 'http://localhost:3000',
  sentryDsn: process.env.NEXT_PUBLIC_SENTRY_DSN ?? '',
  posthogKey: process.env.NEXT_PUBLIC_POSTHOG_KEY ?? '',
  posthogHost: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? ''
} as const;
