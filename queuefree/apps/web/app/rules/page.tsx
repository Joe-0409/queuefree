import Link from 'next/link';
import { DEFAULT_RUNTIME_CONFIG, QUEUE_BOOST_MAX_PER_ENTRY, QUEUE_TOP_PROTECTED_COUNT } from '@queuefree/shared';
import { PageHero } from '@/components/page-hero';
import { PageShell } from '@/components/page-shell';
import { SectionCard } from '@/components/section-card';
import { ButtonLink } from '@/components/ui/button';

export default function RulesCenterPage(): React.ReactElement {
  return (
    <PageShell>
      <div className="space-y-10">
        <PageHero
          eyebrow="Rules Center"
          title="Public rules for queue, wallet, activities, and deletion"
          description="The website keeps a simple but review-ready rules center. Hard rules come from the locked PRD and shared constants. Adjustable thresholds are shown as runtime fallback examples only."
          aside={
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-soft">Runtime fallback snapshot</p>
              <div className="mt-5 space-y-3 text-sm text-slate-200">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Top protected zone: {QUEUE_TOP_PROTECTED_COUNT}</div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Boost limit per entry: {QUEUE_BOOST_MAX_PER_ENTRY}</div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Base guard hours: {DEFAULT_RUNTIME_CONFIG.baseGuardHours}</div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Freeze grace hours: {DEFAULT_RUNTIME_CONFIG.freezeGraceHours}</div>
              </div>
            </div>
          }
        />

        <section className="grid gap-4 lg:grid-cols-3">
          <SectionCard
            title="Queue rules"
            body="Public queue, protected zone, boost boundaries, frozen-entry behavior, and fixed settlement slot rules."
            tone="brand"
          />
          <SectionCard
            title="Wallet rules"
            body="Pending-to-available release, activation gates, withdrawal thresholds, and clawback boundaries."
            tone="accent"
          />
          <SectionCard
            title="Activity rules"
            body="Campaign pages may vary by activity slug, but cannot override hard product, queue, or wallet rules."
            tone="warning"
          />
        </section>

        <section className="rounded-[2rem] border border-border bg-white p-8 shadow-panel">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">Rule entry points</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Link href="/rules/queue" className="rounded-3xl border border-border bg-slate-50 p-5 transition-colors hover:border-brand hover:bg-brand-soft/30">
              <p className="text-sm font-semibold text-slate-950">Queue rules</p>
              <p className="mt-2 text-sm text-slate-600">Ranking, frozen entries, boost, and slot settlement.</p>
            </Link>
            <Link href="/rules/wallet" className="rounded-3xl border border-border bg-slate-50 p-5 transition-colors hover:border-brand hover:bg-brand-soft/30">
              <p className="text-sm font-semibold text-slate-950">Wallet rules</p>
              <p className="mt-2 text-sm text-slate-600">Pending, available, frozen, activation, and withdrawal rules.</p>
            </Link>
            <Link href="/rules/activity/launch-week" className="rounded-3xl border border-border bg-slate-50 p-5 transition-colors hover:border-brand hover:bg-brand-soft/30">
              <p className="text-sm font-semibold text-slate-950">Launch-week activity</p>
              <p className="mt-2 text-sm text-slate-600">Example public campaign page using the locked slug route.</p>
            </Link>
            <Link href="/delete-account" className="rounded-3xl border border-border bg-slate-50 p-5 transition-colors hover:border-brand hover:bg-brand-soft/30">
              <p className="text-sm font-semibold text-slate-950">Delete account</p>
              <p className="mt-2 text-sm text-slate-600">Deletion means request, settlement, then anonymization.</p>
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/terms" variant="secondary">Terms</ButtonLink>
            <ButtonLink href="/privacy" variant="secondary">Privacy</ButtonLink>
            <ButtonLink href="/contact" variant="primary">Contact</ButtonLink>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
