import createClient from 'openapi-fetch';
import type { paths } from './generated/schema';

export type { components, operations, paths } from './generated/schema';

export const createApiClient = (
  baseUrl: string,
  defaultHeaders?: HeadersInit
) =>
  createClient<paths>({
    baseUrl,
    headers: defaultHeaders
  });

export type QueueFreeApiClient = ReturnType<typeof createApiClient>;
