import * as React from 'react';
import { cn } from '@/lib/utils';

type PageShellProps = {
  children: React.ReactNode;
  width?: 'default' | 'narrow';
};

export function PageShell({ children, width = 'default' }: PageShellProps): React.ReactElement {
  return (
    <div
      className={cn(
        'mx-auto w-full px-4 py-8 sm:px-6 lg:px-8',
        width === 'default' ? 'max-w-[96rem]' : 'max-w-3xl'
      )}
    >
      {children}
    </div>
  );
}
