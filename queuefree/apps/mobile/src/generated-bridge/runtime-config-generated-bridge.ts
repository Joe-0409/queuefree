import type { RuntimeConfig } from '@queuefree/shared';

export async function getRuntimeConfigFromGeneratedBridge(): Promise<RuntimeConfig> {
  throw new Error(
    '[QueueFree mobile skeleton] getRuntimeConfigFromGeneratedBridge is not wired yet. ' +
      'Replace it only after backend exports a registered runtime-config contract and packages/api-client is generated from OpenAPI.'
  );
}
