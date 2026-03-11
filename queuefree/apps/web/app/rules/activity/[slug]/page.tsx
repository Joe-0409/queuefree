import { notFound } from 'next/navigation';
import { PageHero } from '@/components/page-hero';
import { PageShell } from '@/components/page-shell';
import { SectionCard } from '@/components/section-card';
import { activityRulesBySlug, type ActivitySlug } from '@/lib/site-content';

type ActivityRulePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams(): Array<{ slug: ActivitySlug }> {
  return Object.keys(activityRulesBySlug).map((slug) => ({ slug: slug as ActivitySlug }));
}

export default async function ActivityRulePage({ params }: ActivityRulePageProps): Promise<React.ReactElement> {
  const { slug } = await params;
  const activity = activityRulesBySlug[slug as ActivitySlug];

  if (!activity) {
    notFound();
  }

  return (
    <PageShell>
      <div className="space-y-10">
        <PageHero
          eyebrow="Activity Rules"
          title={activity.title}
          description={activity.summary}
        />

        <section className="grid gap-4 lg:grid-cols-2">
          <SectionCard
            title="What this activity can do"
            body={activity.highlights.join(' ')}
            tone="brand"
          />
          <SectionCard
            title="What this activity cannot do"
            body={activity.constraints.join(' ')}
            tone="warning"
          />
        </section>

        <section className="rounded-[2rem] border border-border bg-white p-8 shadow-panel">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">Public campaign breakdown</h2>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">Highlights</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {activity.highlights.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-brand" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-warning">Constraints</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {activity.constraints.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-warning" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
