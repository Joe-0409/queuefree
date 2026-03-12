'use client';

import { LAUNCH_MARKET, LAUNCH_RULE_VERSION } from '@queuefree/shared';
import { usePathname } from 'next/navigation';
import { getActiveNavItem } from '@/lib/navigation';

export function AdminTopbar(): React.ReactElement {
  const pathname = usePathname();
  const activeItem = getActiveNavItem(pathname);
  const appEnv = process.env.NEXT_PUBLIC_APP_ENV ?? 'local';

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-[96rem] flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">QueueFree Admin</div>
          <div className="mt-1 text-lg font-bold tracking-tight text-slate-950">{activeItem?.label ?? 'Admin Skeleton'}</div>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full border border-border bg-panel px-3 py-2 font-semibold text-slate-600">Env: {appEnv}</span>
          <span className="rounded-full border border-border bg-panel px-3 py-2 font-semibold text-slate-600">Market: {LAUNCH_MARKET}</span>
          <span className="rounded-full border border-border bg-panel px-3 py-2 font-semibold text-slate-600">
            Rule: {LAUNCH_RULE_VERSION}
          </span>
        </div>
      </div>
    </header>
  );
}
