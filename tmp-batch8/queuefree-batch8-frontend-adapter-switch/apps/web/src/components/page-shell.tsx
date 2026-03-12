import * as React from 'react';

export function PageShell({ children }: { children: React.ReactNode }): React.ReactElement {
  return <div className="mx-auto max-w-content px-4 py-10 sm:px-6 lg:px-8">{children}</div>;
}
