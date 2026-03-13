import type { RuntimeConfigAdapter } from './runtime-config-adapter';
import { getRuntimeConfigFromGeneratedBridge } from '../generated-bridge/runtime-config-generated-bridge';

export const generatedRuntimeConfigAdapter: RuntimeConfigAdapter = {
  getRuntimeConfig: () => getRuntimeConfigFromGeneratedBridge(),
};
