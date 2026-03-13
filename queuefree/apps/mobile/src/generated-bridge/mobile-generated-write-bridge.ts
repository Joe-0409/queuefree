import {
  checkInQueueGuardRawFromGeneratedSource,
  createCheckoutSessionRawFromGeneratedSource
} from './mobile-generated-write-fetchers';
import {
  mapGeneratedCheckoutSessionPayload,
  mapGeneratedQueueGuardCheckInPayload
} from './mobile-generated-write-mappers';
import type { CreateCheckoutSessionInput } from '../adapters/mobile-write-adapter';

export async function createCheckoutSessionFromGeneratedBridge(input: CreateCheckoutSessionInput) {
  const payload = await createCheckoutSessionRawFromGeneratedSource(input);
  return mapGeneratedCheckoutSessionPayload(payload);
}

export async function checkInQueueGuardFromGeneratedBridge() {
  const payload = await checkInQueueGuardRawFromGeneratedSource();
  return mapGeneratedQueueGuardCheckInPayload(payload);
}
