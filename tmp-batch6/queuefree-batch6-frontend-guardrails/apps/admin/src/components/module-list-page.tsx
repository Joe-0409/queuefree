import { AdminPageHeader } from '@/components/admin-page-header';
import { AdminSkeletonBanner } from '@/components/admin-skeleton-banner';
import { MetricCard } from '@/components/metric-card';
import { PageShell } from '@/components/page-shell';
import { SectionTitle } from '@/components/section-title';
import { DataTable, type DataTableConfig } from '@/components/ui/data-table';
import { Card, CardContent } from '@/components/ui/card';
import type { ListPageConfig } from '@/lib/admin-content';

export function ModuleListPage({ config }: { config: ListPageConfig }): React.ReactElement {
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

        {config.metrics.length > 0 ? (
          <section className="grid gap-4 lg:grid-cols-4">
            {config.metrics.map((metric) => (
              <MetricCard key={metric.title} {...metric} />
            ))}
          </section>
        ) : null}

        <section className="grid gap-6 xl:grid-cols-[1.4fr,0.8fr]">
          <Card>
            <CardContent className="space-y-4 p-6">
              <SectionTitle title={config.tableTitle} description={config.tableDescription} />
              <DataTable columns={config.table.columns} rows={config.table.rows} emptyMessage={config.table.emptyMessage} />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-4 p-6">
              <SectionTitle title="Current skeleton notes" description="These notes explain why the screen is intentionally static in batch 4." />
              <ul className="space-y-3 text-sm text-slate-600">
                {config.notes.map((note) => (
                  <li key={note} className="rounded-2xl border border-border bg-panel-muted px-4 py-3">
                    {note}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        {config.secondaryTable ? (
          <section>
            <Card>
              <CardContent className="space-y-4 p-6">
                <SectionTitle title={config.secondaryTable.title} description={config.secondaryTable.description} />
                <DataTable
                  columns={config.secondaryTable.columns}
                  rows={config.secondaryTable.rows}
                  emptyMessage={config.secondaryTable.emptyMessage}
                />
              </CardContent>
            </Card>
          </section>
        ) : null}
      </div>
    </PageShell>
  );
}
