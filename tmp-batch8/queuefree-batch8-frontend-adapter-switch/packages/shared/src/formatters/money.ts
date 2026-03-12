import { LAUNCH_CURRENCY, LAUNCH_LOCALE } from "../constants/launch";

export function formatMinorMoney(
  minorValue: number,
  currency: string = LAUNCH_CURRENCY,
  locale: string = LAUNCH_LOCALE
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(minorValue / 100);
}
