import {
  DEFAULT_RUNTIME_CONFIG,
  LAUNCH_WEBSITE,
  ORDER_QUEUE_SEAT_COUNT,
  QUEUE_BOOST_MAX_PER_ENTRY,
  QUEUE_TOP_PROTECTED_COUNT,
  formatMinorMoney
} from '@queuefree/shared';
import { ButtonLink } from '@/components/ui/button';
import { PageHero } from '@/components/page-hero';
import { PageShell } from '@/components/page-shell';
import { SectionCard } from '@/components/section-card';
import { complianceLinks, heroBullets, howItWorks, launchBaseline, ruleHighlights } from '@/lib/site-content';

export default function HomePage(): React.ReactElement {
  return (
    <PageShell>
      <div className="space-y-12">
        <PageHero
          eyebrow="Public Website"
          title="Buy real products. Join the public queue after payment."
          description="QueueFree is positioned as shopping-first commerce with a transparent queue promotion model. Public rules, privacy, terms, account deletion, and contact pages remain accessible on the web."
          aside={
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-soft">Launch baseline</p>
              <div className="mt-5 grid gap-3">
                {launchBaseline.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.16em] text-slate-300">{item.label}</p>
                    <p className="mt-1 text-sm font-semibold text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          }
        />

        <section className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-3xl border border-border bg-white p-8 shadow-panel">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">What the website must do</p>
            <ul className="mt-6 space-y-3 text-sm text-slate-600">
              {heroBullets.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-brand" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/rules">Read the rules</ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                Contact & appeal
              </ButtonLink>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-slate-950 p-8 text-slate-50 shadow-panel">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-soft">Reviewer-friendly summary</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-300">Queue seat rule</p>
                <p className="mt-2 text-lg font-semibold">{ORDER_QUEUE_SEAT_COUNT} order = {ORDER_QUEUE_SEAT_COUNT} seat</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-300">Protected zone</p>
                <p className="mt-2 text-lg font-semibold">Top {QUEUE_TOP_PROTECTED_COUNT}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-300">Boost limit</p>
                <p className="mt-2 text-lg font-semibold">{QUEUE_BOOST_MAX_PER_ENTRY} per entry</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-300">Default cashback cap</p>
                <p className="mt-2 text-lg font-semibold">{formatMinorMoney(DEFAULT_RUNTIME_CONFIG.defaultCashbackCapMinor)}</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">How it works</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">Web copy aligned with the locked PRD</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {howItWorks.map((item) => (
              <SectionCard key={item.title} title={item.title} body={item.body} />
            ))}
          </div>
        </section>

        <section>
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">Rule highlights</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">Hard rules stay consistent across app, web, backend, and ops</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {ruleHighlights.map((item, index) => (
              <SectionCard
                key={item.title}
                title={item.title}
                body={item.body}
                tone={index === 0 ? 'brand' : index === 1 ? 'warning' : index === 2 ? 'accent' : 'default'}
              />
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-border bg-white p-8 shadow-panel">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">Public routes</p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950">Launch website path checklist</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {complianceLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-3xl border border-border bg-slate-50 p-5 transition-colors hover:border-brand hover:bg-brand-soft/30"
              >
                <p className="text-sm font-semibold text-slate-950">{item.label}</p>
                <p className="mt-2 text-sm text-slate-600">{LAUNCH_WEBSITE}{item.href}</p>
              </a>
            ))}
          </div>
        </section>
      </div>
    </PageShell>
  );
}
