import * as React from 'react';
import { Card } from '@/components/ui/card';

export function SectionCard({
  title,
  body,
  tone = 'default'
}: {
  title: string;
  body: string;
  tone?: 'default' | 'brand' | 'accent' | 'warning' | 'danger';
}): React.ReactElement {
  const toneMap = {
    default: 'border-border bg-white',
    brand: 'border-brand/15 bg-brand-soft/40',
    accent: 'border-accent/15 bg-accent-soft/40',
    warning: 'border-warning/20 bg-warning-soft/40',
    danger: 'border-danger/15 bg-danger-soft/40'
  } as const;

  return (
    <Card className={toneMap[tone]}>
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-3 text-sm text-slate-600">{body}</p>
    </Card>
  );
}
