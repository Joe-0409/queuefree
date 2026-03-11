import { DEFAULT_MINOR_UNIT_SCALE } from '../constants/business-rules';
import { LAUNCH_CURRENCY_CODE, LAUNCH_LOCALE } from '../constants/launch';
export function formatMoneyFromMinor(amountMinor, options = {}) {
    const { currency = LAUNCH_CURRENCY_CODE, locale = LAUNCH_LOCALE, minorUnitScale = DEFAULT_MINOR_UNIT_SCALE, minimumFractionDigits, maximumFractionDigits, } = options;
    const value = amountMinor / minorUnitScale;
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits,
        maximumFractionDigits,
    }).format(value);
}
export const formatMinorMoney = formatMoneyFromMinor;
//# sourceMappingURL=money.js.map