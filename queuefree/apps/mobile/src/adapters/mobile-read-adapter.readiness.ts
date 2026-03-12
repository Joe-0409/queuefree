const API_CLIENT_IS_GENERATED = true;
const API_CLIENT_RUNTIME_MODE = 'generated' as const;
import { getMobileGeneratedBridgeCoverageSummary } from '../generated-bridge/mobile-generated-bridge.manifest';

export type MobileGeneratedAdapterReadiness = {
  screenDataMode: 'mock' | 'generated';
  apiClientRuntimeMode: typeof API_CLIENT_RUNTIME_MODE;
  generatedAdapterReady: boolean;
  coverageReady: boolean;
  bridgeCoverage: {
    total: number;
    wired: number;
    pending: number;
  };
  reasons: string[];
};

/**
 * Flip this to true only after batch-level generated adapter mapping is implemented.
 * This keeps the repository safe even if packages/api-client has already been generated.
 */
export const MOBILE_GENERATED_ADAPTER_READY = false;

export function getMobileGeneratedAdapterReadiness(): MobileGeneratedAdapterReadiness {
  const reasons: string[] = [];
  const bridgeCoverage = getMobileGeneratedBridgeCoverageSummary();
  const coverageReady = bridgeCoverage.pending === 0;

  if (!API_CLIENT_IS_GENERATED) {
    reasons.push('packages/api-client is still in placeholder mode.');
  }

  if (!MOBILE_GENERATED_ADAPTER_READY) {
    reasons.push('Mobile screen-model mapping to generated SDK is intentionally disabled in this batch.');
  }

  if (!coverageReady) {
    reasons.push(`Mobile generated bridge coverage is ${bridgeCoverage.wired}/${bridgeCoverage.total}.`);
  }

  return {
    screenDataMode: API_CLIENT_IS_GENERATED && MOBILE_GENERATED_ADAPTER_READY && coverageReady ? 'generated' : 'mock',
    apiClientRuntimeMode: API_CLIENT_RUNTIME_MODE,
    generatedAdapterReady: MOBILE_GENERATED_ADAPTER_READY,
    coverageReady,
    bridgeCoverage,
    reasons
  };
}
