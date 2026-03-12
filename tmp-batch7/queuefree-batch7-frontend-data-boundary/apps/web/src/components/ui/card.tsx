import * as React from 'react';
import { cn } from '@/lib/utils';

export function Card({ className, children }: React.HTMLAttributes<HTMLDivElement>): React.ReactElement {
  return (
    <div className={cn('rounded-3xl border border-border bg-white p-6 shadow-panel', className)}>
      {children}
    </div>
  );
}
