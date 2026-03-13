import { generatedMobileWriteAdapter } from './mobile-write-adapter.generated';
import { mockMobileWriteAdapter } from './mobile-write-adapter.mock';
import { getMobileWriteAdapterStatusSummary } from './mobile-write-adapter.readiness';
import type { MobileWriteAdapter } from './mobile-write-adapter';

export type MobileWriteAdapterMode = 'mock' | 'generated';

export function resolveMobileWriteAdapter(): MobileWriteAdapter {
  const summary = getMobileWriteAdapterStatusSummary();
  return summary.writeDataMode === 'generated' ? generatedMobileWriteAdapter : mockMobileWriteAdapter;
}

export function getMobileWriteAdapterMode(): MobileWriteAdapterMode {
  return getMobileWriteAdapterStatusSummary().writeDataMode;
}

export function getMobileWriteAdapterStatus() {
  return getMobileWriteAdapterStatusSummary();
}
