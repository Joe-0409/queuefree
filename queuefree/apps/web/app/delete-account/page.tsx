import { PageHero } from '@/components/page-hero';
import { PageShell } from '@/components/page-shell';
import { SectionCard } from '@/components/section-card';
import { deleteAccountBlockers, deleteAccountFlow, deleteStatusList } from '@/lib/site-content';

export default function DeleteAccountPage(): React.ReactElement {
  return (
    <PageShell>
      <div className="space-y-10">
        <PageHero
          eyebrow="Delete Account"
          title="Deletion means request, settlement, then anonymization"
          description="QueueFree must keep a public delete-account guidance page and an in-app deletion entry. The launch flow does not promise instant physical deletion."
        />

        <section className="grid gap-4 lg:grid-cols-2">
          <SectionCard
            title="Before anonymization"
            body={deleteAccountFlow.join(' ')}
            tone="brand"
          />
          <SectionCard
            title="Common blockers"
            body={deleteAccountBlockers.join(' ')}
            tone="warning"
          />
        </section>

        <section className="rounded-[2rem] border border-border bg-white p-8 shadow-panel">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">Deletion statuses</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {deleteStatusList.map((status) => (
              <div key={status} className="rounded-2xl border border-border bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                {status}
              </div>
            ))}
          </div>
          <div className="mt-8 space-y-4 text-sm text-slate-600">
            <p>
              While settlement is pending, the account cannot create new orders, add withdrawal accounts, file new
              withdrawals, or bind a new invite code.
            </p>
            <p>
              Active, frozen, or review-held queue entries leave the ranking with the unified deletion-removal reason in the backend flow.
            </p>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
