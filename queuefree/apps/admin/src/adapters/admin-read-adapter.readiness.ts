const API_CLIENT_IS_GENERATED = true;
const API_CLIENT_RUNTIME_MODE = 'generated' as const;
import { getAdminGeneratedBridgeCoverageSummary } from '@/generated-bridge/admin-generated-bridge.manifest';

export type AdminGeneratedAdapterReadiness = {
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
 * Keep false until backend DTOs are finalized and field mapping is implemented.
 * Generated bridge functions are stubbed to avoid type errors from incomplete API contracts.
 */
export const ADMIN_GENERATED_ADAPTER_READY = false;

export function getAdminGeneratedAdapterReadiness(): AdminGeneratedAdapterReadiness {
  const reasons: string[] = [];
  const bridgeCoverage = getAdminGeneratedBridgeCoverageSummary();
  const coverageReady = bridgeCoverage.pending === 0;

  if (!API_CLIENT_IS_GENERATED) {
    reasons.push('packages/api-client is still in placeholder mode.');
  }

  if (!ADMIN_GENERATED_ADAPTER_READY) {
    reasons.push('Admin screen-model mapping to generated SDK is intentionally disabled in this batch.');
  }

  if (!coverageReady) {
    reasons.push(`Admin generated bridge coverage is ${bridgeCoverage.wired}/${bridgeCoverage.total}.`);
  }

  return {
    screenDataMode: API_CLIENT_IS_GENERATED && ADMIN_GENERATED_ADAPTER_READY && coverageReady ? 'generated' : 'mock',
    apiClientRuntimeMode: API_CLIENT_RUNTIME_MODE,
    generatedAdapterReady: ADMIN_GENERATED_ADAPTER_READY,
    coverageReady,
    bridgeCoverage,
    reasons
  };
}
