/**
 * QueueFree generated SDK barrel.
 *
 * This file is rewritten by scripts/generate-api-client.mjs.
 * Do not hand-edit.
 */
export * from './generated/client';

export type ApiClientRuntimeMode = 'placeholder' | 'generated';

export const API_CLIENT_RUNTIME_MODE: ApiClientRuntimeMode = 'generated';
export const API_CLIENT_IS_GENERATED = true;

export async function loadGeneratedApiClient() {
 return import('./generated/client');
}
