'use client';

import { AdminPageHeader } from '@/components/admin-page-header';
import { AdminSkeletonBanner } from '@/components/admin-skeleton-banner';
import { MetricCard } from '@/components/metric-card';
import { PageShell } from '@/components/page-shell';
import { QueryStatePanel } from '@/components/query-state-panel';
import { SectionTitle } from '@/components/section-title';
import { DataTable } from '@/components/ui/data-table';
import { Card, CardContent } from '@/components/ui/card';
import { useAdminListPageQuery } from '@/queries/use-admin-queries';
import type { AdminListPageKind } from '@/lib/admin-repository';

export function ModuleListPage({ kind }: { kind: AdminListPageKind }): React.ReactElement {
  const listQuery = useAdminListPageQuery(kind);

  return (
    <PageShell>
      <div className="space-y-8">
        {listQuery.data ? (
          <AdminPageHeader
            eyebrow={listQuery.data.eyebrow}
            title={listQuery.data.title}
            description={listQuery.data.description}
            meta={listQuery.data.meta}
          />
        ) : null}

        {!listQuery.data ? (
          <AdminPageHeader
            eyebrow="Admin skeleton"
            title="Loading module"
            description="Module config now flows through the admin repository layer."
            meta={[`Module: ${kind}`]}
          />
        ) : null}

        <AdminSkeletonBanner />

        {listQuery.isPending ? (
          <QueryStatePanel
            mode="loading"
            title="Preparing module list"
            description="This route now reads list-page config through a query hook and repository layer."
          />
        ) : null}

        {listQuery.isError ? (
          <QueryStatePanel
            mode="error"
            title="Module list is unavailable"
            description="Retry the repository-backed module query."
            onRetry={() => {
              void listQuery.refetch();
            }}
          />
        ) : null}

        {listQuery.data ? (
          <>
            {listQuery.data.metrics.length > 0 ? (
              <section className="grid gap-4 lg:grid-cols-4">
                {listQuery.data.metrics.map((metric) => (
                  <MetricCard key={metric.title} {...metric} />
                ))}
              </section>
            ) : null}

            <section className="grid gap-6 xl:grid-cols-[1.4fr,0.8fr]">
              <Card>
                <CardContent className="space-y-4 p-6">
                  <SectionTitle title={listQuery.data.tableTitle} description={listQuery.data.tableDescription} />
                  <DataTable columns={listQuery.data.table.columns} rows={listQuery.data.table.rows} emptyMessage={listQuery.data.table.emptyMessage} />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="space-y-4 p-6">
                  <SectionTitle title="Current skeleton notes" description="These notes explain why the screen is intentionally static in batch 7." />
                  <ul className="space-y-3 text-sm text-slate-600">
                    {listQuery.data.notes.map((note) => (
                      <li key={note} className="rounded-2xl border border-border bg-panel-muted px-4 py-3">
                        {note}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </section>

            {listQuery.data.secondaryTable ? (
              <section>
                <Card>
                  <CardContent className="space-y-4 p-6">
                    <SectionTitle title={listQuery.data.secondaryTable.title} description={listQuery.data.secondaryTable.description} />
                    <DataTable
                      columns={listQuery.data.secondaryTable.columns}
                      rows={listQuery.data.secondaryTable.rows}
                      emptyMessage={listQuery.data.secondaryTable.emptyMessage}
                    />
                  </CardContent>
                </Card>
              </section>
            ) : null}
          </>
        ) : null}
      </div>
    </PageShell>
  );
}
