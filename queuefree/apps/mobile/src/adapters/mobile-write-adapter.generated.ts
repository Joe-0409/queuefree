import type { MobileWriteAdapter } from './mobile-write-adapter';
import {
  checkInQueueGuardFromGeneratedBridge,
  createCheckoutSessionFromGeneratedBridge
} from '../generated-bridge/mobile-generated-write-bridge';

export const generatedMobileWriteAdapter: MobileWriteAdapter = {
  createCheckoutSession: (input) => createCheckoutSessionFromGeneratedBridge(input),
  checkInQueueGuard: () => checkInQueueGuardFromGeneratedBridge()
};
