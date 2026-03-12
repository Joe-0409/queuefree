export const appEnv = {
  envName: process.env.EXPO_PUBLIC_ENV_NAME ?? "local",
  enableDemoMode: (process.env.EXPO_PUBLIC_ENABLE_DEMO_MODE ?? "true") === "true",
  apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL ?? "http://localhost:4000",
  sentryDsn: process.env.EXPO_PUBLIC_SENTRY_DSN ?? "",
  posthogKey: process.env.EXPO_PUBLIC_POSTHOG_KEY ?? "",
  posthogHost: process.env.EXPO_PUBLIC_POSTHOG_HOST ?? ""
} as const;
