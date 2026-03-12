import type { RuntimeConfigAdapter } from './runtime-config-adapter';
import { generatedRuntimeConfigAdapter } from './runtime-config-adapter.generated';
import { mockRuntimeConfigAdapter } from './runtime-config-adapter.mock';
import { getRuntimeConfigAdapterReadiness } from './runtime-config-adapter.readiness';

export type RuntimeConfigAdapterMode = 'mock' | 'generated';

export const RUNTIME_CONFIG_ADAPTER_MODE: RuntimeConfigAdapterMode = getRuntimeConfigAdapterReadiness().runtimeConfigMode;

export function getRuntimeConfigAdapterStatusSummary() {
  return getRuntimeConfigAdapterReadiness();
}

export function resolveRuntimeConfigAdapter(): RuntimeConfigAdapter {
  if (RUNTIME_CONFIG_ADAPTER_MODE === 'generated') {
    return generatedRuntimeConfigAdapter;
  }

  return mockRuntimeConfigAdapter;
}
