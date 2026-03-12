import { ButtonLink } from '@/components/ui/button';
import { PageShell } from '@/components/page-shell';

export default function NotFound(): React.ReactElement {
  return (
    <PageShell>
      <div className="rounded-[2rem] border border-border bg-white p-10 text-center shadow-panel">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950">Page not found</h1>
        <p className="mt-4 text-sm text-slate-600">
          The requested page is not part of the public launch route set. Use the rules center or homepage instead.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">Home</ButtonLink>
          <ButtonLink href="/rules" variant="secondary">Rules Center</ButtonLink>
        </div>
      </div>
    </PageShell>
  );
}
