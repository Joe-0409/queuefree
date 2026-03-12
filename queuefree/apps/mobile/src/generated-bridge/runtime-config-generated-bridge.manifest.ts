import type { RuntimeConfigAdapter } from '../adapters/runtime-config-adapter';

export type RuntimeConfigGeneratedBridgeManifestEntry = {
  method: keyof RuntimeConfigAdapter;
  bridge: string;
  wired: boolean;
  note: string;
};

export const runtimeConfigGeneratedBridgeManifest = [
  {
    method: 'getRuntimeConfig',
    bridge: 'getRuntimeConfigFromGeneratedBridge',
    wired: false,
    note: 'Wait for generated SDK coverage for runtime config or another registered backend delivery path.'
  }
] satisfies ReadonlyArray<RuntimeConfigGeneratedBridgeManifestEntry>;

export function getRuntimeConfigGeneratedBridgeCoverageSummary() {
  const total = runtimeConfigGeneratedBridgeManifest.length;
  const wired = runtimeConfigGeneratedBridgeManifest.filter((entry) => entry.wired).length;

  return {
    total,
    wired,
    pending: total - wired
  };
}
