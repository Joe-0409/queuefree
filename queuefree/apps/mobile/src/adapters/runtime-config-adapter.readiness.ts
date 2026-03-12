import { API_CLIENT_IS_GENERATED, API_CLIENT_RUNTIME_MODE } from '@queuefree/api-client';
import { getRuntimeConfigGeneratedBridgeCoverageSummary } from '../generated-bridge/runtime-config-generated-bridge.manifest';

export type RuntimeConfigAdapterReadiness = {
  runtimeConfigMode: 'mock' | 'generated';
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
 * Flip this to true only after runtime-config wiring is implemented against generated SDK or another registered backend contract.
 */
export const RUNTIME_CONFIG_GENERATED_ADAPTER_READY = false;

export function getRuntimeConfigAdapterReadiness(): RuntimeConfigAdapterReadiness {
  const reasons: string[] = [];
  const bridgeCoverage = getRuntimeConfigGeneratedBridgeCoverageSummary();
  const coverageReady = bridgeCoverage.pending === 0;

  if (!API_CLIENT_IS_GENERATED) {
    reasons.push('packages/api-client is still in placeholder mode.');
  }

  if (!RUNTIME_CONFIG_GENERATED_ADAPTER_READY) {
    reasons.push('Runtime config generated adapter wiring is intentionally disabled in this batch.');
  }

  if (!coverageReady) {
    reasons.push(`Runtime config generated bridge coverage is ${bridgeCoverage.wired}/${bridgeCoverage.total}.`);
  }

  return {
    runtimeConfigMode: API_CLIENT_IS_GENERATED && RUNTIME_CONFIG_GENERATED_ADAPTER_READY && coverageReady ? 'generated' : 'mock',
    apiClientRuntimeMode: API_CLIENT_RUNTIME_MODE,
    generatedAdapterReady: RUNTIME_CONFIG_GENERATED_ADAPTER_READY,
    coverageReady,
    bridgeCoverage,
    reasons
  };
}
