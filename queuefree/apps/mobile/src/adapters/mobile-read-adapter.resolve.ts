import { generatedMobileReadAdapter } from './mobile-read-adapter.generated';
import { mockMobileReadAdapter } from './mobile-read-adapter.mock';
import type { MobileReadAdapter } from './mobile-read-adapter';
import { getMobileGeneratedAdapterReadiness } from './mobile-read-adapter.readiness';

export type MobileReadAdapterMode = 'mock' | 'generated';

export const MOBILE_READ_ADAPTER_MODE: MobileReadAdapterMode = getMobileGeneratedAdapterReadiness().screenDataMode;

export function getMobileReadAdapterStatusSummary() {
 return getMobileGeneratedAdapterReadiness();
}

export function resolveMobileReadAdapter(): MobileReadAdapter {
 if (MOBILE_READ_ADAPTER_MODE === 'generated') {
 return generatedMobileReadAdapter;
 }

 return mockMobileReadAdapter;
}
