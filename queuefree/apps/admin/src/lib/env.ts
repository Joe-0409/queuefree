export const adminAppEnv = {
  appEnv: process.env.NEXT_PUBLIC_APP_ENV ?? 'local',
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:4000',
  adminBaseUrl: process.env.NEXT_PUBLIC_ADMIN_BASE_URL ?? 'http://localhost:3001',
  sentryDsn: process.env.NEXT_PUBLIC_SENTRY_DSN ?? ''
} as const;
