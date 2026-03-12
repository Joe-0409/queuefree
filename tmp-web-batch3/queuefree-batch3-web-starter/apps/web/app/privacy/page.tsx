import { PageHero } from '@/components/page-hero';
import { PageShell } from '@/components/page-shell';
import { SectionCard } from '@/components/section-card';
import { privacySections } from '@/lib/site-content';

export default function PrivacyPage(): React.ReactElement {
  return (
    <PageShell>
      <div className="space-y-10">
        <PageHero
          eyebrow="Privacy Policy"
          title="How QueueFree handles launch-phase user data"
          description="This public page exists so app users, reviewers, and partners can inspect the data-handling model used by the MVP launch."
        />

        <section className="grid gap-4 lg:grid-cols-2">
          {privacySections.map((section, index) => (
            <SectionCard
              key={section.title}
              title={section.title}
              body={section.body}
              tone={index === 0 ? 'brand' : index === 1 ? 'accent' : 'default'}
            />
          ))}
        </section>

        <section className="rounded-[2rem] border border-border bg-white p-8 shadow-panel">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">Launch policy notes</h2>
          <div className="mt-6 space-y-5 text-sm text-slate-600">
            <p>
              QueueFree uses phone-based authentication, order information, queue-state events, wallet ledgers,
              withdrawal records, and risk-control inputs to run the commerce flow. The system keeps public rules and
              audit-friendly traces because the queue and wallet model must stay explainable.
            </p>
            <p>
              Account deletion follows a settlement-and-anonymize path. Open financial or order obligations can delay
              anonymization until the business flow is complete.
            </p>
            <p>
              This starter keeps public copy on the website. In a later batch, the team can switch selected policy
              sections to runtime-managed content without changing the locked route structure.
            </p>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
