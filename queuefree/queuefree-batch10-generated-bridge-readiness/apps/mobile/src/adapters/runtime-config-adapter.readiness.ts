import { API_CLIENT_IS_GENERATED, API_CLIENT_RUNTIME_MODE } from '@queuefree/api-client';

export type RuntimeConfigAdapterReadiness = {
  runtimeConfigMode: 'mock' | 'generated';
  apiClientRuntimeMode: typeof API_CLIENT_RUNTIME_MODE;
  generatedAdapterReady: boolean;
  reasons: string[];
};

/**
 * Flip this to true only after runtime-config wiring is implemented against generated SDK or another registered backend contract.
 */
export const RUNTIME_CONFIG_GENERATED_ADAPTER_READY = false;

export function getRuntimeConfigAdapterReadiness(): RuntimeConfigAdapterReadiness {
  const reasons: string[] = [];

  if (!API_CLIENT_IS_GENERATED) {
    reasons.push('packages/api-client is still in placeholder mode.');
  }

  if (!RUNTIME_CONFIG_GENERATED_ADAPTER_READY) {
    reasons.push('Runtime config generated adapter wiring is intentionally disabled in this batch.');
  }

  return {
    runtimeConfigMode: API_CLIENT_IS_GENERATED && RUNTIME_CONFIG_GENERATED_ADAPTER_READY ? 'generated' : 'mock',
    apiClientRuntimeMode: API_CLIENT_RUNTIME_MODE,
    generatedAdapterReady: RUNTIME_CONFIG_GENERATED_ADAPTER_READY,
    reasons
  };
}
