import { getMobileGeneratedWriteBridgeCoverageSummary } from '../generated-bridge/mobile-generated-write-bridge.manifest';

const API_CLIENT_IS_GENERATED = true;
export const MOBILE_WRITE_GENERATED_ADAPTER_READY = true;

export type MobileWriteAdapterStatusSummary = {
  writeDataMode: 'mock' | 'generated';
  apiClientRuntimeMode: 'placeholder' | 'generated';
  generatedAdapterReady: boolean;
  bridgeCoverage: { total: number; wired: number; pending: number };
  reasons: string[];
};

export function getMobileWriteAdapterStatusSummary(): MobileWriteAdapterStatusSummary {
  const bridgeCoverage = getMobileGeneratedWriteBridgeCoverageSummary();
  const coverageReady = bridgeCoverage.pending === 0;
  const reasons: string[] = [];

  if (!API_CLIENT_IS_GENERATED) {
    reasons.push('packages/api-client is still in placeholder mode.');
  }

  if (!MOBILE_WRITE_GENERATED_ADAPTER_READY) {
    reasons.push('Mobile write adapter readiness is disabled.');
  }

  if (!coverageReady) {
    reasons.push(`Mobile write bridge coverage is incomplete (${bridgeCoverage.wired}/${bridgeCoverage.total}).`);
  }

  if (reasons.length === 0) {
    reasons.push('Mobile write adapter is fully wired to the generated SDK.');
  }

  return {
    writeDataMode: API_CLIENT_IS_GENERATED && MOBILE_WRITE_GENERATED_ADAPTER_READY && coverageReady ? 'generated' : 'mock',
    apiClientRuntimeMode: API_CLIENT_IS_GENERATED ? 'generated' : 'placeholder',
    generatedAdapterReady: MOBILE_WRITE_GENERATED_ADAPTER_READY,
    bridgeCoverage,
    reasons
  };
}
