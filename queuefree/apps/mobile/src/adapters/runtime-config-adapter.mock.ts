import {
  DEFAULT_RUNTIME_CONFIG,
  type RuntimeConfig
} from '@queuefree/shared';
import { waitForMock } from '../lib/mock-delay';
import type { RuntimeConfigAdapter } from './runtime-config-adapter';

export const mockRuntimeConfigAdapter: RuntimeConfigAdapter = {
  async getRuntimeConfig(): Promise<RuntimeConfig> {
    await waitForMock();
    return DEFAULT_RUNTIME_CONFIG;
  }
};
