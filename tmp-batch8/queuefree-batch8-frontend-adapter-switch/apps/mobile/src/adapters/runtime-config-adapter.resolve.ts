import type { RuntimeConfigAdapter } from './runtime-config-adapter';
import { generatedRuntimeConfigAdapter } from './runtime-config-adapter.generated';
import { mockRuntimeConfigAdapter } from './runtime-config-adapter.mock';

export type RuntimeConfigAdapterMode = 'mock' | 'generated';

export const RUNTIME_CONFIG_ADAPTER_MODE: RuntimeConfigAdapterMode = 'mock';

export function resolveRuntimeConfigAdapter(): RuntimeConfigAdapter {
  if (RUNTIME_CONFIG_ADAPTER_MODE === 'generated') {
    return generatedRuntimeConfigAdapter;
  }

  return mockRuntimeConfigAdapter;
}
