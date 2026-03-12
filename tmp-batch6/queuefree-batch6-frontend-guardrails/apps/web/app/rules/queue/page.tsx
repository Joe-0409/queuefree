import {
  ORDER_QUEUE_SEAT_COUNT,
  QUEUE_BOOST_MAX_PER_ENTRY,
  QUEUE_TOP_PROTECTED_COUNT,
  formatDateTime
} from '@queuefree/shared';
import { PageHero } from '@/components/page-hero';
import { PageShell } from '@/components/page-shell';
import { SectionCard } from '@/components/section-card';
import { queueRuleCards, queueStatusList } from '@/lib/site-content';

export default function QueueRulesPage(): React.ReactElement {
  return (
    <PageShell>
      <div className="space-y-10">
        <PageHero
          eyebrow="Queue Rules"
          title="How ranking, freeze, restore, and settlement work"
          description="The public queue is governed by fixed rules. Display rank is derived from active entries, while sorting truth stays on sortScore in the backend."
          aside={
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-soft">At a glance</p>
              <div className="mt-5 space-y-3 text-sm text-slate-200">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">{ORDER_QUEUE_SEAT_COUNT} order = {ORDER_QUEUE_SEAT_COUNT} seat</div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Top {QUEUE_TOP_PROTECTED_COUNT} cannot be jumped by boost</div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Boost cap: {QUEUE_BOOST_MAX_PER_ENTRY} per entry</div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Display example time: {formatDateTime('2026-03-11T12:00:00Z')}</div>
              </div>
            </div>
          }
        />

        <section className="grid gap-4 lg:grid-cols-2">
          {queueRuleCards.map((item, index) => (
            <SectionCard
              key={item.title}
              title={item.title}
              body={item.body}
              tone={index === 0 ? 'brand' : index === 1 ? 'default' : index === 2 ? 'warning' : 'accent'}
            />
          ))}
        </section>

        <section className="rounded-[2rem] border border-border bg-white p-8 shadow-panel">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">Queue entry statuses</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {queueStatusList.map((status) => (
              <div key={status} className="rounded-2xl border border-border bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                {status}
              </div>
            ))}
          </div>
          <div className="mt-8 space-y-4 text-sm text-slate-600">
            <p>
              Winning is determined only at the instant a fixed settlement slot runs. The winner is the current valid rank #1.
            </p>
            <p>
              Frozen entries preserve original ordering value but are excluded from valid rank and settlement until restored.
            </p>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
