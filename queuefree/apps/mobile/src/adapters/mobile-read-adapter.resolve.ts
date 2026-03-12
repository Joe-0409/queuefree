import { generatedMobileReadAdapter } from './mobile-read-adapter.generated';
import { mockMobileReadAdapter } from './mobile-read-adapter.mock';
import type { MobileReadAdapter } from './mobile-read-adapter';

export type MobileReadAdapterMode = 'mock' | 'generated';

/**
 * Pre-OpenAPI lock:
 * keep frontend on mock mode until backend exports OpenAPI and packages/api-client is generated.
 */
export const MOBILE_READ_ADAPTER_MODE: MobileReadAdapterMode = 'mock';

export function resolveMobileReadAdapter(): MobileReadAdapter {
  if (MOBILE_READ_ADAPTER_MODE === 'generated') {
    return generatedMobileReadAdapter;
  }

  return mockMobileReadAdapter;
}
