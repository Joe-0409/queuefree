import createClient from 'openapi-fetch';
import type { paths, components } from './generated/schema';

export type { paths, components };

export function createApiClient(baseUrl: string) {
  return createClient<paths>({ baseUrl });
}
