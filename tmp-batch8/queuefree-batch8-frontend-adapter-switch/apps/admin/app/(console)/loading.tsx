import { AdminShell } from '@/components/admin-shell';
import { PageShell } from '@/components/page-shell';
import { Card, CardContent } from '@/components/ui/card';

export default function ConsoleLoading(): React.ReactElement {
  return (
    <AdminShell>
      <PageShell>
        <Card>
          <CardContent className="space-y-3 p-6">
            <div className="text-sm font-semibold text-slate-950">Loading console module</div>
            <div className="h-4 w-2/3 animate-pulse rounded-full bg-slate-200" />
            <div className="h-4 w-full animate-pulse rounded-full bg-slate-200" />
            <div className="h-4 w-5/6 animate-pulse rounded-full bg-slate-200" />
          </CardContent>
        </Card>
      </PageShell>
    </AdminShell>
  );
}
