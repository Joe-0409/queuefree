import { DEFAULT_RUNTIME_CONFIG } from '@queuefree/shared';

const ruleDateFormatter = new Intl.DateTimeFormat(DEFAULT_RUNTIME_CONFIG.locale, {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  timeZone: DEFAULT_RUNTIME_CONFIG.timezone
});

export function formatRuleUpdatedAt(updatedAt: string): string {
  const parsed = new Date(updatedAt);

  if (Number.isNaN(parsed.getTime())) {
    return updatedAt;
  }

  return ruleDateFormatter.format(parsed);
}
