import type { CheckoutSessionData, QueueGuardCheckInData } from '../adapters/mobile-write-adapter';
import { checkoutSessionSchema, queueGuardCheckInSchema } from '../schemas/mobile-write-schemas';

function formatIssues(issues: Array<{ path: (string | number)[]; message: string }>) {
  return issues
    .slice(0, 5)
    .map((issue) => `${issue.path.join('.') || '<root>'}: ${issue.message}`)
    .join('; ');
}

function parseOrThrow<T>(
  label: string,
  parseFn: (value: unknown) => { success: true; data: T } | { success: false; error: { issues: Array<{ path: (string | number)[]; message: string }> } },
  value: unknown
): T {
  const result = parseFn(value);

  if (!result.success) {
    throw new Error(`[QueueFree mobile write bridge] ${label} failed screen-model validation. ${formatIssues(result.error.issues)}`);
  }

  return result.data;
}

export function validateCheckoutSessionData(value: unknown): CheckoutSessionData {
  return parseOrThrow('createCheckoutSession', checkoutSessionSchema.safeParse.bind(checkoutSessionSchema), value);
}

export function validateQueueGuardCheckInData(value: unknown): QueueGuardCheckInData {
  return parseOrThrow('checkInQueueGuard', queueGuardCheckInSchema.safeParse.bind(queueGuardCheckInSchema), value);
}
