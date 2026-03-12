import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRuntimeConfigStore } from '../store/runtime-config-store';
import {
  RUNTIME_CONFIG_ADAPTER_MODE,
  resolveRuntimeConfigAdapter
} from '../adapters/runtime-config-adapter.resolve';

export function useRuntimeConfig() {
  const replaceRuntimeConfig = useRuntimeConfigStore((state) => state.replaceRuntimeConfig);
  const config = useRuntimeConfigStore((state) => state.config);

  const query = useQuery({
    queryKey: ['runtime-config', RUNTIME_CONFIG_ADAPTER_MODE],
    queryFn: () => resolveRuntimeConfigAdapter().getRuntimeConfig(),
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
