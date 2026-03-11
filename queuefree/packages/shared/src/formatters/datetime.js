import { LAUNCH_LOCALE, LAUNCH_TIMEZONE } from '../constants/launch';
function toDate(input) {
    return input instanceof Date ? input : new Date(input);
}
export function formatDateTime(input, options = {}) {
    const locale = options.locale ?? LAUNCH_LOCALE;
    const timeZone = options.timeZone ?? LAUNCH_TIMEZONE;
    const date = toDate(input);
    return new Intl.DateTimeFormat(locale, {
        dateStyle: 'medium',
        timeStyle: 'short',
        timeZone,
    }).format(date);
}
export function formatDate(input, options = {}) {
    const locale = options.locale ?? LAUNCH_LOCALE;
    const timeZone = options.timeZone ?? LAUNCH_TIMEZONE;
    const date = toDate(input);
    return new Intl.DateTimeFormat(locale, {
        dateStyle: 'medium',
        timeZone,
    }).format(date);
}
export function formatTime(input, options = {}) {
    const locale = options.locale ?? LAUNCH_LOCALE;
    const timeZone = options.timeZone ?? LAUNCH_TIMEZONE;
    const date = toDate(input);
    return new Intl.DateTimeFormat(locale, {
        timeStyle: 'short',
        timeZone,
    }).format(date);
}
//# sourceMappingURL=datetime.js.map