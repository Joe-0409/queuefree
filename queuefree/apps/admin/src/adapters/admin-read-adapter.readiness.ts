import { API_CLIENT_IS_GENERATED, API_CLIENT_RUNTIME_MODE } from '@queuefree/api-client';

export type AdminGeneratedAdapterReadiness = {
 screenDataMode: 'mock' | 'generated';
 apiClientRuntimeMode: typeof API_CLIENT_RUNTIME_MODE;
 generatedAdapterReady: boolean;
 reasons: string[];
};

/**
 * Flip this to true only after Admin screen-model mapping is implemented against generated SDK methods.
 */
export const ADMIN_GENERATED_ADAPTER_READY = false;

export function getAdminGeneratedAdapterReadiness(): AdminGeneratedAdapterReadiness {
 const reasons: string[] = [];

 if (!API_CLIENT_IS_GENERATED) {
 reasons.push('packages/api-client is still in placeholder mode.');
 }

 if (!ADMIN_GENERATED_ADAPTER_READY) {
 reasons.push('Admin screen-model mapping to generated SDK is intentionally disabled in this batch.');
 }

 return {
 screenDataMode: API_CLIENT_IS_GENERATED && ADMIN_GENERATED_ADAPTER_READY ? 'generated' : 'mock',
 apiClientRuntimeMode: API_CLIENT_RUNTIME_MODE,
 generatedAdapterReady: ADMIN_GENERATED_ADAPTER_READY,
 reasons
 };
}
