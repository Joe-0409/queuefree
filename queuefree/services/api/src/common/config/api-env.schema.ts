import { AppEnv } from '@queuefree/shared';
import { z } from 'zod';

export const ApiEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  APP_ENV: z.nativeEnum(AppEnv).default(AppEnv.LOCAL),
  PORT: z.coerce.number().int().positive().default(4000),
  DATABASE_URL: z.string().optional(),
  REDIS_URL: z.string().optional(),
  JWT_ACCESS_SECRET: z.string().optional(),
  JWT_REFRESH_SECRET: z.string().optional(),
  SENTRY_DSN: z.string().optional(),
  R2_ACCOUNT_ID: z.string().optional(),
  R2_ACCESS_KEY_ID: z.string().optional(),
  R2_SECRET_ACCESS_KEY: z.string().optional(),
  R2_BUCKET: z.string().optional(),
  R2_PUBLIC_BASE_URL: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
  SMS_PROVIDER_NAME: z.string().optional(),
  SMS_PROVIDER_BASE_URL: z.string().optional(),
  SMS_PROVIDER_API_KEY: z.string().optional()
});

export type ApiEnv = z.infer<typeof ApiEnvSchema>;
