import Link from 'next/link';
import { complianceLinks, siteName } from '@/lib/site-content';
import { ButtonLink } from '@/components/ui/button';

export function SiteHeader(): React.ReactElement {
  return (
    <header className="border-b border-border bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-content flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-bold tracking-tight text-slate-950">
          {siteName}
        </Link>
        <nav className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
          {complianceLinks.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-full px-3 py-2 transition-colors hover:bg-slate-100 hover:text-slate-950">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <ButtonLink href="/rules" variant="ghost">
            Rules
          </ButtonLink>
          <ButtonLink href="/delete-account" variant="primary">
            Delete Account
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
