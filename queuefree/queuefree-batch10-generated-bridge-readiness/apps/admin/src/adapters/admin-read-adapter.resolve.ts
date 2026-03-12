import { generatedAdminReadAdapter } from './admin-read-adapter.generated';
import { mockAdminReadAdapter } from './admin-read-adapter.mock';
import type { AdminReadAdapter } from './admin-read-adapter';
import { getAdminGeneratedAdapterReadiness } from './admin-read-adapter.readiness';

export type AdminReadAdapterMode = 'mock' | 'generated';

export const ADMIN_READ_ADAPTER_MODE: AdminReadAdapterMode = getAdminGeneratedAdapterReadiness().screenDataMode;

export function getAdminReadAdapterStatusSummary() {
  return getAdminGeneratedAdapterReadiness();
}

export function resolveAdminReadAdapter(): AdminReadAdapter {
  if (ADMIN_READ_ADAPTER_MODE === 'generated') {
    return generatedAdminReadAdapter;
  }

  return mockAdminReadAdapter;
}
