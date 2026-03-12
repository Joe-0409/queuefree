import { LAUNCH_LOCALE, LAUNCH_TIMEZONE } from "../constants/launch";

export function formatDateTime(
  value: Date | string | number,
  timezone: string = LAUNCH_TIMEZONE,
  locale: string = LAUNCH_LOCALE,
  options: Intl.DateTimeFormatOptions = {}
): string {
  const date = value instanceof Date ? value : new Date(value);

  return new Intl.DateTimeFormat(locale, {
    timeZone: timezone,
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    ...options
  }).format(date);
}

export function formatDateOnly(
  value: Date | string | number,
  timezone: string = LAUNCH_TIMEZONE,
  locale: string = LAUNCH_LOCALE
): string {
  return formatDateTime(value, timezone, locale, {
    year: "numeric",
    month: "short",
    day: "2-digit"
  });
}
