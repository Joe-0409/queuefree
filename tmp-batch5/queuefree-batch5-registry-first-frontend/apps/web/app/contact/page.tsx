import Link from 'next/link';
import { PageHero } from '@/components/page-hero';
import { PageShell } from '@/components/page-shell';
import { SectionCard } from '@/components/section-card';
import { ButtonLink } from '@/components/ui/button';

const contactTopics = [
  {
    title: 'Order & queue questions',
    body: 'Use this path when the user needs help with order payment, queue status, ranking changes, freeze, restore, or slot settlement visibility.'
  },
  {
    title: 'Wallet & withdrawal questions',
    body: 'Use this path for pending balance, available balance, activation, withdrawal review, rejection, or payout investigation.'
  },
  {
    title: 'Account deletion & appeal',
    body: 'Use this path when the user wants deletion guidance, settlement blockers, or appeal support for moderation and risk decisions.'
  }
] as const;

export default function ContactPage(): React.ReactElement {
  return (
    <PageShell>
      <div className="space-y-10">
        <PageHero
          eyebrow="Contact & Appeal"
          title="Public support entry for users, reviewers, and partners"
          description="This page exists to keep a public contact and appeal route on the launch website. The in-app support entry remains part of the mobile flow."
          aside={
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-soft">Current launch intent</p>
              <div className="mt-5 space-y-3 text-sm text-slate-200">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Public contact path for web review</div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">In-app support entry for logged-in users</div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Appeal route for deletion, queue, wallet, or risk issues</div>
              </div>
            </div>
          }
        />

        <section className="grid gap-4 lg:grid-cols-3">
          {contactTopics.map((topic, index) => (
            <SectionCard
              key={topic.title}
              title={topic.title}
              body={topic.body}
              tone={index === 0 ? 'brand' : index === 1 ? 'accent' : 'warning'}
            />
          ))}
        </section>

        <section className="rounded-[2rem] border border-border bg-white p-8 shadow-panel">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">What to publish before launch</h2>
          <div className="mt-6 space-y-5 text-sm text-slate-600">
            <p>
              The public route is already fixed as <span className="font-semibold text-slate-950">/contact</span>.
              This starter keeps the compliance page in place even before a live ticketing or email adapter is wired.
            </p>
            <p>
              When the server thread finishes deployment wiring, this page can be upgraded to point at the final support mailbox, ticket form, or CRM workflow without changing the public route.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/rules" variant="primary">Rules Center</ButtonLink>
            <ButtonLink href="/delete-account" variant="secondary">Delete Account</ButtonLink>
            <Link href="/privacy" className="inline-flex items-center text-sm font-semibold text-brand hover:underline">
              Privacy Policy
            </Link>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
