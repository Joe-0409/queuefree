import { resolveMobileWriteAdapter } from '../adapters/mobile-write-adapter.resolve';
import type { CreateCheckoutSessionInput } from '../adapters/mobile-write-adapter';
import { validateCheckoutSessionData, validateQueueGuardCheckInData } from './mobile-write-validators';

function getAdapter() {
  return resolveMobileWriteAdapter();
}

export async function createCheckoutSession(input: CreateCheckoutSessionInput) {
  const data = await getAdapter().createCheckoutSession(input);
  return validateCheckoutSessionData(data);
}

export async function checkInQueueGuard() {
  const data = await getAdapter().checkInQueueGuard();
  return validateQueueGuardCheckInData(data);
}
