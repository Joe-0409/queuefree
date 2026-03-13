export function createIdempotencyKey(prefix: string) {
  const timePart = Date.now().toString(36);
  const randomPart = Math.random().toString(36).slice(2, 10);
  return `qf-${prefix}-${timePart}-${randomPart}`;
}
