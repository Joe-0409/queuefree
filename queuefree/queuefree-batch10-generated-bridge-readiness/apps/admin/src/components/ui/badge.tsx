import * as React from 'react';
import { cn } from '@/lib/utils';

const tones = {
  slate: 'border-border bg-white text-slate-700',
  brand: 'border-brand/20 bg-brand-soft text-blue-900',
  accent: 'border-accent/20 bg-accent-soft text-teal-900',
  warning: 'border-warning/20 bg-warning-soft text-amber-900',
  danger: 'border-danger/20 bg-danger-soft text-red-900'
} as const;

export type BadgeTone = keyof typeof tones;

export function Badge({
  children,
  tone = 'slate',
  className
}: {
  children: React.ReactNode;
  tone?: BadgeTone;
  className?: string;
}): React.ReactElement {
  return (
    <span className={cn('inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-semibold', tones[tone], className)}>
      {children}
    </span>
  );
}
