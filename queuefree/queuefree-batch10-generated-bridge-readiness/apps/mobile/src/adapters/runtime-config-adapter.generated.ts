import type { RuntimeConfig } from '@queuefree/shared';
import type { RuntimeConfigAdapter } from './runtime-config-adapter';

async function unsupported(): Promise<RuntimeConfig> {
  throw new Error(
    '[QueueFree mobile skeleton] runtime config adapter is not wired yet. Replace it only after backend exports the runtime config contract via OpenAPI or registered REST wiring.'
  );
}

export const generatedRuntimeConfigAdapter: RuntimeConfigAdapter = {
  getRuntimeConfig: unsupported
};
