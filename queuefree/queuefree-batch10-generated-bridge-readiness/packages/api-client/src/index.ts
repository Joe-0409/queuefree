/**
 * QueueFree pre-OpenAPI placeholder.
 *
 * Do not add hand-written business contracts here.
 * Replace this file with a generated SDK entrypoint only after backend exports OpenAPI.
 */
export type ApiClientRuntimeMode = 'placeholder' | 'generated';

export const API_CLIENT_RUNTIME_MODE: ApiClientRuntimeMode = 'placeholder';
export const API_CLIENT_IS_GENERATED = false;

export async function loadGeneratedApiClient(): Promise<never> {
  throw new Error(
    '[QueueFree api-client] packages/api-client is still in placeholder mode. ' +
      'Ask backend to export OpenAPI first, then run pnpm generate:api-client.'
  );
}
