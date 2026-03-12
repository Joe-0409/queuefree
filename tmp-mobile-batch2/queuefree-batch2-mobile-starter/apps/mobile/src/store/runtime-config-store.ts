import { create } from "zustand";
import { DEFAULT_RUNTIME_CONFIG, type RuntimeConfig } from "@queuefree/shared";

type RuntimeConfigState = {
  config: RuntimeConfig;
  replaceRuntimeConfig: (config: RuntimeConfig) => void;
};

export const useRuntimeConfigStore = create<RuntimeConfigState>((set) => ({
  config: DEFAULT_RUNTIME_CONFIG,
  replaceRuntimeConfig: (config) => set({ config })
}));
