import type { RuntimeConfig } from '@queuefree/shared';

export async function getRuntimeConfigFromGeneratedBridge(): Promise<RuntimeConfig> {
  throw new Error(
    '[QueueFree runtime-config generated bridge] getRuntimeConfigFromGeneratedBridge is not wired yet. ' +
      'Backend must finalize the runtime-config OpenAPI contract with all required fields.'
  );
}
