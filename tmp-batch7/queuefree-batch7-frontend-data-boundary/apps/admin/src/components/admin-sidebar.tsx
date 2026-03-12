'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { adminNavigation, getActiveNavItem, isNavItemActive } from '@/lib/navigation';
import { cn } from '@/lib/utils';

export function AdminSidebar(): React.ReactElement {
  const pathname = usePathname();
  const activeItem = getActiveNavItem(pathname);

  return (
    <aside className="hidden w-80 shrink-0 border-r border-slate-800 bg-sidebar text-sidebar-foreground lg:block">
      <div className="sticky top-0 flex h-screen flex-col">
        <div className="border-b border-slate-800 px-6 py-6">
          <Link href="/" className="block">
            <div className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">QueueFree</div>
            <div className="mt-2 text-2xl font-bold tracking-tight text-white">Admin Skeleton</div>
          </Link>
          <p className="mt-3 text-sm text-slate-400">
            Frozen-route first shell for operations, finance, risk, governance, and audit.
          </p>
        </div>

        <nav className="flex-1 space-y-6 overflow-y-auto px-4 py-6">
          {adminNavigation.map((group) => (
            <div key={group.title} className="space-y-2">
              <div className="px-3 text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">{group.title}</div>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const active = isNavItemActive(item.href, pathname);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'block rounded-2xl border px-4 py-3 transition-colors',
                        active
                          ? 'border-slate-600 bg-slate-800 text-white'
                          : 'border-transparent bg-transparent text-slate-300 hover:border-slate-800 hover:bg-slate-900'
                      )}
                    >
                      <div className="text-sm font-semibold">{item.label}</div>
                      <div className="mt-1 text-xs leading-5 text-slate-400">{item.description}</div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t border-slate-800 px-6 py-5">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 px-4 py-4">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Current view</div>
            <div className="mt-2 text-sm font-semibold text-white">{activeItem?.label ?? 'Unregistered route'}</div>
            <p className="mt-2 text-xs leading-5 text-slate-400">
              This shell intentionally avoids real auth, RBAC, or API data until registry-first contracts are added.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
