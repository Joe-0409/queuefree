export interface FormatMoneyFromMinorOptions {
    currency?: string;
    locale?: string;
    minorUnitScale?: number;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
}
export declare function formatMoneyFromMinor(amountMinor: number, options?: FormatMoneyFromMinorOptions): string;
export declare const formatMinorMoney: typeof formatMoneyFromMinor;
//# sourceMappingURL=money.d.ts.map