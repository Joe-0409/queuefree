import { API_CLIENT_IS_GENERATED, API_CLIENT_RUNTIME_MODE } from '@queuefree/api-client';

export type MobileGeneratedAdapterReadiness = {
  screenDataMode: 'mock' | 'generated';
  apiClientRuntimeMode: typeof API_CLIENT_RUNTIME_MODE;
  generatedAdapterReady: boolean;
  reasons: string[];
};

/**
 * Flip this to true only after batch-level generated adapter mapping is implemented.
 * This keeps the repository safe even if packages/api-client has already been generated.
 */
export const MOBILE_GENERATED_ADAPTER_READY = false;

export function getMobileGeneratedAdapterReadiness(): MobileGeneratedAdapterReadiness {
  const reasons: string[] = [];

  if (!API_CLIENT_IS_GENERATED) {
    reasons.push('packages/api-client is still in placeholder mode.');
  }

  if (!MOBILE_GENERATED_ADAPTER_READY) {
    reasons.push('Mobile screen-model mapping to generated SDK is intentionally disabled in this batch.');
  }

  return {
    screenDataMode: API_CLIENT_IS_GENERATED && MOBILE_GENERATED_ADAPTER_READY ? 'generated' : 'mock',
    apiClientRuntimeMode: API_CLIENT_RUNTIME_MODE,
    generatedAdapterReady: MOBILE_GENERATED_ADAPTER_READY,
    reasons
  };
}
