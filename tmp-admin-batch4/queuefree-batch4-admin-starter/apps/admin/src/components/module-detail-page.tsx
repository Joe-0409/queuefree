import Link from 'next/link';
import { AdminPageHeader } from '@/components/admin-page-header';
import { AdminSkeletonBanner } from '@/components/admin-skeleton-banner';
import { MetricCard } from '@/components/metric-card';
import { PageShell } from '@/components/page-shell';
import { SectionTitle } from '@/components/section-title';
import { Badge } from '@/components/ui/badge';
import { ButtonLink } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { DetailPageConfig } from '@/lib/admin-content';

export function ModuleDetailPage({ config }: { config: DetailPageConfig }): React.ReactElement {
  return (
    <PageShell>
      <div className="space-y-8">
        <AdminPageHeader
          eyebrow={config.eyebrow}
          title={config.title}
          description={config.description}
          meta={config.meta}
        />

        <AdminSkeletonBanner />

        <div className="flex flex-wrap items-center gap-3">
          <Badge tone={config.badgeTone}>{config.badgeLabel}</Badge>
          <ButtonLink href={config.backHref} variant="secondary">
            Back to list
          </ButtonLink>
        </div>

        {config.metrics.length > 0 ? (
          <section className="grid gap-4 lg:grid-cols-4">
            {config.metrics.map((metric) => (
              <MetricCard key={metric.title} {...metric} />
            ))}
          </section>
        ) : null}

        <section className="grid gap-6 xl:grid-cols-[1.15fr,0.85fr]">
          <div className="space-y-6">
            {config.sections.map((section) => (
              <Card key={section.title}>
                <CardContent className="space-y-4 p-6">
                  <SectionTitle title={section.title} description={section.description} />
                  <dl className="grid gap-3 sm:grid-cols-2">
                    {section.rows.map((row) => (
                      <div key={row.label} className="rounded-2xl border border-border bg-panel-muted px-4 py-3">
                        <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{row.label}</dt>
                        <dd className="mt-2 text-sm font-medium text-slate-900">{row.value}</dd>
                      </div>
                    ))}
                  </dl>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="space-y-4 p-6">
                <SectionTitle title="Action placeholders" description="Buttons stay informational until action contracts are registered." />
                <div className="space-y-3">
                  {config.actions.map((action) => (
                    <div key={action} className="rounded-2xl border border-border bg-panel-muted px-4 py-3 text-sm text-slate-700">
                      {action}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="space-y-4 p-6">
                <SectionTitle title="Route and module alignment" description="This detail page stays within the frozen route scope." />
                <ul className="space-y-3 text-sm text-slate-600">
                  {config.notes.map((note) => (
                    <li key={note} className="rounded-2xl border border-border bg-panel-muted px-4 py-3">
                      {note}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="space-y-4 p-6">
                <SectionTitle title="Related navigation" description="Use frozen routes only." />
                <div className="flex flex-wrap gap-2">
                  {config.relatedLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
