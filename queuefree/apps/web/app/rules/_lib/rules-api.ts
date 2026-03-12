const LOCAL_API_BASE_URL = 'http://localhost:4000';

export type RuleListItem = any;
export type RuleDetailResponse = any;
export type ApiErrorResponse = any;

export async function listRules(): Promise<RuleListItem[]> {
  return [];
}

export async function getRuleBySlug(slug: string): Promise<RuleDetailResponse | null> {
  return null;
}
