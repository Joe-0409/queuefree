'use client';

import Link from 'next/link';
import { AdminPageHeader } from '@/components/admin-page-header';
import { AdminSkeletonBanner } from '@/components/admin-skeleton-banner';
import { MetricCard } from '@/components/metric-card';
import { PageShell } from '@/components/page-shell';
import { QueryStatePanel } from '@/components/query-state-panel';
import { SectionTitle } from '@/components/section-title';
import { Badge } from '@/components/ui/badge';
import { ButtonLink } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAdminDetailPageQuery } from '@/queries/use-admin-queries';
import type { AdminDetailPageKind } from '@/lib/admin-repository';

export function ModuleDetailPage({ kind, id }: { kind: AdminDetailPageKind; id: string }): React.ReactElement {
  const detailQuery = useAdminDetailPageQuery(kind, id);

  return (
    <PageShell>
      <div className="space-y-8">
        {detailQuery.data ? (
          <AdminPageHeader
            eyebrow={detailQuery.data.eyebrow}
            title={detailQuery.data.title}
            description={detailQuery.data.description}
            meta={detailQuery.data.meta}
          />
        ) : null}

        {!detailQuery.data ? (
          <AdminPageHeader
            eyebrow="Admin skeleton"
            title="Loading detail"
            description="Detail config now flows through the admin repository layer."
            meta={[`Module: ${kind}`, `Route param: ${id}`]}
          />
        ) : null}

        <AdminSkeletonBanner />

        {detailQuery.isPending ? (
          <QueryStatePanel
            mode="loading"
            title="Preparing detail screen"
            description="This route now reads detail-page config through a query hook and repository layer."
          />
        ) : null}

        {detailQuery.isError ? (
          <QueryStatePanel
            mode="error"
            title="Detail screen is unavailable"
            description="Retry the repository-backed detail query."
            onRetry={() => {
              void detailQuery.refetch();
            }}
          />
        ) : null}

        {detailQuery.data ? (
          <>
            <div className="flex flex-wrap items-center gap-3">
              <Badge tone={detailQuery.data.badgeTone}>{detailQuery.data.badgeLabel}</Badge>
              <ButtonLink href={detailQuery.data.backHref} variant="secondary">
                Back to list
              </ButtonLink>
            </div>

            {detailQuery.data.metrics.length > 0 ? (
              <section className="grid gap-4 lg:grid-cols-4">
                {detailQuery.data.metrics.map((metric) => (
                  <MetricCard key={metric.title} {...metric} />
                ))}
              </section>
            ) : null}

            <section className="grid gap-6 xl:grid-cols-[1.15fr,0.85fr]">
              <div className="space-y-6">
                {detailQuery.data.sections.map((section) => (
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
                      {detailQuery.data.actions.map((action) => (
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
                      {detailQuery.data.notes.map((note) => (
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
                      {detailQuery.data.relatedLinks.map((link) => (
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
          </>
        ) : null}
      </div>
    </PageShell>
  );
}
