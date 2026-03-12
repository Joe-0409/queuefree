import type { RuntimeConfig } from '@queuefree/shared';

export type RuntimeConfigAdapter = {
  getRuntimeConfig(): Promise<RuntimeConfig>;
};
