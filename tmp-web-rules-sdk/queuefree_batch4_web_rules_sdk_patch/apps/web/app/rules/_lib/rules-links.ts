export function getRuleHref(slug: string): string {
  if (slug === 'queue') {
    return '/rules/queue';
  }

  if (slug === 'wallet') {
    return '/rules/wallet';
  }

  return `/rules/activity/${encodeURIComponent(slug)}`;
}
