import Link from 'next/link';
import { LAUNCH_MARKET, LAUNCH_RULE_VERSION, LAUNCH_TIMEZONE } from '@queuefree/shared';
import { complianceLinks, siteName } from '@/lib/site-content';

export function SiteFooter(): React.ReactElement {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto grid max-w-content gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:px-8">
        <div>
          <p className="text-lg font-semibold text-slate-950">{siteName}</p>
          <p className="mt-3 max-w-xl text-sm text-slate-600">
            Shopping-first public queue promotion. Real product purchase remains the core transaction.
          </p>
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-slate-500">
            Market {LAUNCH_MARKET} · Timezone {LAUNCH_TIMEZONE} · Rule {LAUNCH_RULE_VERSION}
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {complianceLinks.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-slate-600 transition-colors hover:text-slate-950">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
