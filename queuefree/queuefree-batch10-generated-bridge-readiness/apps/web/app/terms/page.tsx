import { PageHero } from '@/components/page-hero';
import { PageShell } from '@/components/page-shell';
import { SectionCard } from '@/components/section-card';
import { termsSections } from '@/lib/site-content';

export default function TermsPage(): React.ReactElement {
  return (
    <PageShell>
      <div className="space-y-10">
        <PageHero
          eyebrow="Terms of Service"
          title="Core service boundaries for the QueueFree MVP"
          description="This public page summarizes the shopping-first operating model, queue promotion boundaries, wallet flow, and launch scope locked by PRD v1.2."
        />

        <section className="grid gap-4 lg:grid-cols-2">
          {termsSections.map((section, index) => (
            <SectionCard
              key={section.title}
              title={section.title}
              body={section.body}
              tone={index === 0 ? 'brand' : index === 1 ? 'warning' : 'default'}
            />
          ))}
        </section>

        <section className="rounded-[2rem] border border-border bg-white p-8 shadow-panel">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">Important launch commitments</h2>
          <div className="mt-6 space-y-5 text-sm text-slate-600">
            <p>
              The service does not sell guaranteed winnings, guaranteed cashback, queue priority for sale, or direct
              cash-probability rights. Users buy physical products and may later receive cashback under public rules.
            </p>
            <p>
              Wallet balance is operationally separated into pending, available, and frozen. Withdrawal review and risk
              review remain available to the platform when required.
            </p>
            <p>
              Public website copy must remain consistent with the mobile app, backend API, and admin governance flow.
            </p>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
