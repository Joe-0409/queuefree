import { createApiClient, type components } from '@queuefree/api-client';

const LOCAL_API_BASE_URL = 'http://localhost:4000';

export type RuleListItem = components['schemas']['RuleListItemDto'];
export type RuleDetailResponse = components['schemas']['RuleDetailResponseDto'];
export type ApiErrorResponse = components['schemas']['ApiErrorResponseDto'];

function getPublicApiBaseUrl(): string {
  return (process.env.NEXT_PUBLIC_API_BASE_URL ?? LOCAL_API_BASE_URL).replace(/\/$/, '');
}

function getApiErrorMessage(error?: ApiErrorResponse | null): string {
  return error?.message ?? 'Unable to load rules at the moment.';
}

function getPublicApiClient() {
  return createApiClient(getPublicApiBaseUrl());
}

export async function listRules(): Promise<RuleListItem[]> {
  const client = getPublicApiClient();
  const { data, error } = await client.GET('/v1/rules');

  if (data) {
    return data;
  }

  throw new Error(getApiErrorMessage(error));
}

export async function getRuleBySlug(slug: string): Promise<RuleDetailResponse | null> {
  const client = getPublicApiClient();
  const { data, error, response } = await client.GET('/v1/rules/{slug}', {
    params: {
      path: {
        slug
      }
    }
  });

  if (data) {
    return data;
  }

  if (response?.status === 404) {
    return null;
  }

  throw new Error(getApiErrorMessage(error));
}
