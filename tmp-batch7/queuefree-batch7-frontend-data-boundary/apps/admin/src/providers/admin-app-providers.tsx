'use client';

import { PropsWithChildren } from 'react';
import { QueryProvider } from '@/providers/query-provider';

export function AdminAppProviders({ children }: PropsWithChildren): React.ReactElement {
  return <QueryProvider>{children}</QueryProvider>;
}
