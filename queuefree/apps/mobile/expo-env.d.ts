/// <reference types="expo/types" />

declare namespace NodeJS {
  interface ProcessEnv {
    EXPO_PUBLIC_APP_ENV?: string;
    EXPO_PUBLIC_API_BASE_URL?: string;
    EXPO_PUBLIC_WEB_BASE_URL?: string;
    EXPO_PUBLIC_SENTRY_DSN?: string;
    EXPO_PUBLIC_POSTHOG_KEY?: string;
    EXPO_PUBLIC_POSTHOG_HOST?: string;
  }
}
