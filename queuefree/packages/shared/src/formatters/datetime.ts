import { LAUNCH_LOCALE, LAUNCH_TIMEZONE } from '../constants/launch';

export interface FormatDateTimeOptions {
  locale?: string;
  timeZone?: string;
}

function toDate(input: string | number | Date): Date {
  return input instanceof Date ? input : new Date(input);
}

export function formatDateTime(
  input: string | number | Date,
  options: FormatDateTimeOptions = {},
): string {
  const locale = options.locale ?? LAUNCH_LOCALE;
  const timeZone = options.timeZone ?? LAUNCH_TIMEZONE;
  const date = toDate(input);

  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone,
  }).format(date);
}

export function formatDate(
  input: string | number | Date,
  options: FormatDateTimeOptions = {},
): string {
  const locale = options.locale ?? LAUNCH_LOCALE;
  const timeZone = options.timeZone ?? LAUNCH_TIMEZONE;
  const date = toDate(input);

  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeZone,
  }).format(date);
}

export function formatTime(
  input: string | number | Date,
  options: FormatDateTimeOptions = {},
): string {
  const locale = options.locale ?? LAUNCH_LOCALE;
  const timeZone = options.timeZone ?? LAUNCH_TIMEZONE;
  const date = toDate(input);

  return new Intl.DateTimeFormat(locale, {
    timeStyle: 'short',
    timeZone,
  }).format(date);
}
