import { generatedAdminReadAdapter } from './admin-read-adapter.generated';
import { mockAdminReadAdapter } from './admin-read-adapter.mock';
import type { AdminReadAdapter } from './admin-read-adapter';

export type AdminReadAdapterMode = 'mock' | 'generated';

/**
 * Pre-OpenAPI lock:
 * keep Admin on mock mode until backend exports OpenAPI and packages/api-client is generated.
 */
export const ADMIN_READ_ADAPTER_MODE: AdminReadAdapterMode = 'mock';

export function resolveAdminReadAdapter(): AdminReadAdapter {
  if (ADMIN_READ_ADAPTER_MODE === 'generated') {
    return generatedAdminReadAdapter;
  }

  return mockAdminReadAdapter;
}
