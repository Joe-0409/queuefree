import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { DEFAULT_RUNTIME_CONFIG } from "@queuefree/shared";
import { useRuntimeConfigStore } from "../store/runtime-config-store";

async function loadRuntimeConfig() {
  return DEFAULT_RUNTIME_CONFIG;
}

export function useRuntimeConfig() {
  const replaceRuntimeConfig = useRuntimeConfigStore((state) => state.replaceRuntimeConfig);
  const config = useRuntimeConfigStore((state) => state.config);

  const query = useQuery({
    queryKey: ["runtime-config"],
    queryFn: loadRuntimeConfig,
    staleTime: 60_000
  });

  useEffect(() => {
    if (query.data) {
      replaceRuntimeConfig(query.data);
    }
  }, [query.data, replaceRuntimeConfig]);

  return {
    ...query,
    config
  };
}
