import { formatDateTime, LAUNCH_MARKET, LAUNCH_RULE_VERSION, LAUNCH_TIMEZONE } from '@queuefree/shared';
import { AdminPageHeader } from '@/components/admin-page-header';
import { AdminSkeletonBanner } from '@/components/admin-skeleton-banner';
import { MetricCard } from '@/components/metric-card';
import { PageShell } from '@/components/page-shell';
import { SectionTitle } from '@/components/section-title';
import { DataTable } from '@/components/ui/data-table';
import { Card, CardContent } from '@/components/ui/card';
import {
  dashboardBacklogTable,
  dashboardMetrics,
  dashboardQueueTable,
  dashboardRiskNotes,
  dashboardWalletTable
} from '@/lib/admin-content';

const generatedAt = formatDateTime('2026-03-11T08:00:00.000Z');

export default function DashboardPage(): React.ReactElement {
  return (
    <PageShell>
      <div className="space-y-8">
        <AdminPageHeader
          eyebrow="Dashboard"
          title="QueueFree admin overview"
          description="Core KPI blocks for operations, queue health, funds, risk backlog, and governance follow-up."
          meta={[
            `Market: ${LAUNCH_MARKET}`,
            `Timezone: ${LAUNCH_TIMEZONE}`,
            `Rule version: ${LAUNCH_RULE_VERSION}`,
            `Snapshot: ${generatedAt}`
          ]}
        />

        <AdminSkeletonBanner />

        <section className="grid gap-4 lg:grid-cols-4">
          {dashboardMetrics.map((metric) => (
            <MetricCard key={metric.title} {...metric} />
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.25fr,0.95fr]">
          <Card>
            <CardContent className="space-y-4 p-6">
              <SectionTitle
                title="Queue and slot attention"
                description="Operational snapshot aligned to fixed settlement slots and queue protection rules."
              />
              <DataTable columns={dashboardQueueTable.columns} rows={dashboardQueueTable.rows} />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-4 p-6">
              <SectionTitle
                title="Funds and approvals"
                description="Withdrawal review and pending release items remain mock-only in this batch."
              />
              <DataTable columns={dashboardWalletTable.columns} rows={dashboardWalletTable.rows} />
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.1fr,0.9fr]">
          <Card>
            <CardContent className="space-y-4 p-6">
              <SectionTitle
                title="Backlog focus"
                description="These rows indicate what real Admin APIs should prioritize once contracts are registered."
              />
              <DataTable columns={dashboardBacklogTable.columns} rows={dashboardBacklogTable.rows} />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-4 p-6">
              <SectionTitle title="Guardrails for this batch" description="What stays intentionally out of scope in batch 4." />
              <ul className="space-y-3 text-sm text-slate-600">
                {dashboardRiskNotes.map((note) => (
                  <li key={note} className="rounded-2xl border border-border bg-panel-muted px-4 py-3">
                    {note}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>
      </div>
    </PageShell>
  );
}
